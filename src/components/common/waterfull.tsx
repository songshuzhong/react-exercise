import * as React from 'react';

import '../../styles/components/waterfull.less';

interface IProps {
    height: string
    triger(sign, dy): any
    onRefresh(disappear: Function, show: Function): any
    onLoadMore(disappear: Function, show: Function): any
}

interface IState {}

export class Waterfull extends React.Component<IProps, IState> {
    private wrapper = null;
    private refresh = null;
    private loading = null;
    private release = null;
    private hasNoMore = null;
    private loadError = null;
    private refreshError = null;
    private sign = 0;
    private startY = 0;
    private topStart = 0;
    private topEnd = 0;
    private releaseText = '↑ 释放更新';
    private refreshText = '↓ 下拉刷新';
    private loadingText = '加载中......';
    private hasNoMoreText = '没有更多了';
    constructor(props) {
        super(props);
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
        this.startY = e.touches[0].pageY;
        if (this.wrapper.style.transform) {
            this.topStart = this.wrapper.style.transform
                .split(",")[1]
                .replace("px", "")
                .trim();
        }
    }

    touchmoveHandler(e) {
        this.topEnd = e.touches[0].pageY - this.startY + Number(this.topStart);

        const dy = Math.abs(this.topEnd);
        this.sign = this.topEnd / dy;

        this.topEnd = dy > 150? 150: dy;
        this.wrapper.style.transform =
            "translate3d(0, " + this.sign * this.topEnd + "px, 0)";
        this.props.triger(this.sign, this.topEnd);
        if(this.sign > 0) {
            e.preventDefault();
            if (this.topEnd === 150) {
                this.release.style.display = 'block';
            } else {
                this.refresh.style.display = 'block';
            }
            this.refreshError.style.display = 'none';
        } else {
            this.loading.style.display = 'block';
        }
    }

    touchendHandeler(e) {
        if (this.sign > 0) {
            this.props.onRefresh(() => {
                this.setNotification('');
            }, () => {
                this.setNotification('refreshError');
            });
        } else {
            this.props.onLoadMore(() => {
                this.setNotification('');
            }, () => {
                this.setNotification('loadError');
            });
        }
        this.wrapper.style.transition = "0.3s cubic-bezier(0,0,0.2,1.15)";
        this.wrapper.style.transform = "translate3d(0, 0, 0)";
    }

    setNotification = (type) => {
        type === 'refreshError' ? this.refreshError.style.display = 'block' : this.refreshError.style.display = 'none';
        type === 'refresh' ? this.refresh.style.display = 'block' : this.refresh.style.display = 'none';
        type === 'release' ? this.release.style.display = 'block' : this.release.style.display = 'none';
        type === 'loading' ? this.loading.style.display = 'block' : this.loading.style.display = 'none';
        type === 'hasNoMore' ? this.hasNoMore.style.display = 'block' : this.hasNoMore.style.display = 'none';
        type === 'loadError' ? this.loadError.style.display = 'block' : this.loadError.style.display = 'none';
    }

    render() {
        const { height, children } = this.props;
        return (
            <div className='hk-waterfull-wrapper' style={{height: height}}>
                <div className='waterfull-text' ref={ref => this.refreshError = ref}>抱歉，刷新出错了。(ノへ`、)</div>
                <div className='waterfull-text' ref={ref => this.refresh = ref}>{this.refreshText}</div>
                <div className='waterfull-text' ref={ref => this.release = ref}>{this.releaseText}</div>
                <div className='waterfull-content' ref={ref => this.wrapper = ref}>
                    { children }
                </div>
                <div className='waterfull-text' ref={ref => this.loading = ref}>{this.loadingText}</div>
                <div className='waterfull-text' ref={ref => this.hasNoMore = ref}>{this.hasNoMoreText}</div>
                <div className='waterfull-text' ref={ref => this.loadError = ref}>抱歉，下载出错了。(ノへ`、)</div>
            </div>
        );
    }
}
