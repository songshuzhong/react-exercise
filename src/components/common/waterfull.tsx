import * as React from 'react';

import '../../styles/components/waterfull.less';

interface IProps {
    height: string
    triger(sign, dy): any
    onRefresh(disappear: Function, show: Function): any
    onLoadMore(disappear: Function, show: Function): any
}

interface IState {
    pullHeight: number
}

export class Waterfull extends React.Component<IProps, IState> {
    private wrapper = null;
    private refresh = null;
    private loading = null;
    private release = null;
    private hasNoMore = null;
    private loadError = null;
    private refreshError = null;
    private startX = 0;
    private startY = 0;
    private releaseText = '↑ 释放更新';
    private refreshText = '↓ 下拉刷新';
    private loadingText = '加载中......';
    private hasNoMoreText = '没有更多了';
    constructor(props) {
        super(props);
        this.state = {pullHeight: 0};
        this.touchstartHandler = this.touchstartHandler.bind(this);
        this.touchmoveHandler = this.touchmoveHandler.bind(this);
        this.touchendHandeler = this.touchendHandeler.bind(this);
    }

    componentDidMount() {
        this.wrapper.addEventListener("touchstart", this.touchstartHandler);
        this.wrapper.addEventListener("touchmove", this.touchmoveHandler);
        this.wrapper.addEventListener("touchend", this.touchendHandeler);
    }

    touchstartHandler(e) {
        const targetEvent = e.changedTouches[0];
        this.startX = targetEvent.clientX;
        this.startY = targetEvent.clientY;
    }

    touchmoveHandler(e) {
        const scrollTop = this.getScrollTop();
        const scrollH = this.wrapper.scrollHeight;
        const conH = this.wrapper.offsetHeight;
        const targetEvent = e.changedTouches[0];
        const curX = targetEvent.clientX;
        const curY = targetEvent.clientY;
        const diffX = curX - this.startX;
        const diffY = curY - this.startY;

        // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
            // 滚动距离小于设定值 &&回调onPullDownMove 函数，并且回传位置值
            if (diffY > 5 && scrollTop < 1) {
                // 阻止执行浏览器默认动作
                event.preventDefault();
                this.onPullDownMove([{
                    touchStartY: this.startY,
                    touchMoveY: curY
                }]);
            } else if (diffY < 0 && (scrollH - scrollTop - conH) < 1500) {
                // 阻止执行浏览器默认动作
                // event.preventDefault();
                this.onPullUpMove([{
                    touchStartY: this.startY,
                    touchMoveY: curY
                }]);
            }
        }
    }

    touchendHandeler(e) {
        const scrollTop = this.getScrollTop();
        const targetEvent = e.changedTouches[0];
        const curX = targetEvent.clientX;
        const curY = targetEvent.clientY;
        const diffX = curX - this.startX;
        const diffY = curY - this.startY;

        // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
            if (diffY > 5 && scrollTop < 1) {
                // 回调onPullDownRefresh 函数，即满足刷新条件
                this.onPullDownRefresh();
            }
        }
    }

    getScrollTop = () => {
        if (this.wrapper) {
            if (this.wrapper === document.body) {
                return document.documentElement.scrollTop || document.body.scrollTop;
            }
            return this.wrapper.scrollTop;
        } else {
            return 0;
        }
    }

    setNotification = (type) => {
        type === 'refreshError' ? this.refreshError.style.display = 'block' : this.refreshError.style.display = 'none';
        type === 'refresh' ? this.refresh.style.display = 'block' : this.refresh.style.display = 'none';
        type === 'release' ? this.release.style.display = 'block' : this.release.style.display = 'none';
        type === 'loading' ? this.loading.style.display = 'block' : this.loading.style.display = 'none';
        type === 'hasNoMore' ? this.hasNoMore.style.display = 'block' : this.hasNoMore.style.display = 'none';
        type === 'loadError' ? this.loadError.style.display = 'block' : this.loadError.style.display = 'none';
    }

    // 拖拽的缓动公式 - easeOutSine
    easing = (distance) => {
        const t = distance;
        const b = 0;
        const d = screen.availHeight; // 允许拖拽的最大距离
        const c = d / 2.5; // 提示标签最大有效拖拽距离

        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    onPullDownMove = (data)  => {
        let diff = data[0].touchMoveY - data[0].touchStartY;
        if (diff < 0) {
            diff = 0;
        }
        diff = this.easing(diff);
        if (diff > 150) {
            console.log('pulling enough');
        } else {
            console.log('pulling');
        }
        this.setState({
            pullHeight: diff,
        });
        // this.props.handleAction(loaderState);
    }

    onPullUpMove = (data) => {
        this.setState({
            pullHeight: 0,
        });
        // this.props.handleAction(Switch.loading);
    }

    onPullDownRefresh = () => {
        if (1) {
            this.setState({pullHeight: 0});
            // this.props.handleAction(Switch.reset);
        } else {
            this.setState({
                pullHeight: 0,
            });
            // this.props.handleAction(Switch.refreshing);
        }
    }

    render() {
        const { height, children } = this.props;
        const { pullHeight } = this.state;

        const msgStyle = pullHeight ? {
            WebkitTransform: `translate3d(0, ${pullHeight}px, 0)`,
            transform: `translate3d(0, ${pullHeight}px, 0)`
        } : null;

        return (
            <div className='hk-waterfull-wrapper' style={{height: height}}>
                <div className='waterfull-text' ref={ref => this.refreshError = ref}>抱歉，刷新出错了。(ノへ`、)</div>
                <div className='waterfull-text' ref={ref => this.refresh = ref}>{this.refreshText}</div>
                <div className='waterfull-text' ref={ref => this.release = ref}>{this.releaseText}</div>
                <div className='waterfull-content' ref={ref => this.wrapper = ref} style={msgStyle}>
                    { children }
                </div>
                <div className='waterfull-text' ref={ref => this.loading = ref}>{this.loadingText}</div>
                <div className='waterfull-text' ref={ref => this.hasNoMore = ref}>{this.hasNoMoreText}</div>
                <div className='waterfull-text' ref={ref => this.loadError = ref}>抱歉，下载出错了。(ノへ`、)</div>
            </div>
        );
    }
}
