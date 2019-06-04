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
        e.stopPropagation();
        e.preventDefault();
        this.startY = e.touches[0].pageY;
        if (this.wrapper.style.transform) {
            this.topStart = this.wrapper.style.transform
                .split(",")[1]
                .replace("px", "")
                .trim();
        }
    }

    touchmoveHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        this.topEnd = e.touches[0].pageY - this.startY + Number(this.topStart);

        const dy = Math.abs(this.topEnd);
        this.sign = this.topEnd / dy;

        this.topEnd = dy > 150? 150: dy;
        this.wrapper.style.transform =
            "translate3d(0, " + this.sign * this.topEnd + "px, 0)";
        this.props.triger(this.sign, this.topEnd);
        if(this.sign > 0) {
            if (this.topEnd === 150) {
                this.refresh.style.display = 'none';
                this.release.style.display = 'block';
            } else {
                this.refresh.style.display = 'block';
            }
            this.refreshError.style.display = 'none';
        } else {
            this.loading.style.display = 'block';
            this.loadError.style.display = 'none';
        }
    }

    touchendHandeler(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.sign > 0) {
            this.props.onRefresh(() => {
                this.refresh.style.display = 'none';
                this.release.style.display = 'none';
                this.loadError.style.display = 'none';
                this.refreshError.style.display = 'none';
            }, () => {
                this.refresh.style.display = 'none';
                this.release.style.display = 'none';
                this.refreshError.style.display = 'block';
            });
        } else {
            this.props.onLoadMore(() => {
                this.loading.style.display = 'none';
                this.loadError.style.display = 'none';
                this.refreshError.style.display = 'none';
            }, () => {
                this.loading.style.display = 'none';
                this.loadError.style.display = 'block';
            });
        }
        this.wrapper.style.transition = "0.3s cubic-bezier(0,0,0.2,1.15)";
        this.wrapper.style.transform = "translate3d(0, 0, 0)";
    }

    render() {
        const { height, children } = this.props;
        return (
            <div className='hk-waterfull-wrapper' style={{height: height}}>
                <div className='waterfull-text' ref={ref => this.refreshError = ref}>抱歉，出错了。(ノへ`、)</div>
                <div className='waterfull-text' ref={ref => this.refresh = ref}>{this.refreshText}</div>
                <div className='waterfull-text' ref={ref => this.release = ref}>{this.releaseText}</div>
                <div className='waterfull-content' ref={ref => this.wrapper = ref}>
                    { children }
                </div>
                <div className='waterfull-text' ref={ref => this.loading = ref}>{this.loadingText}</div>
                <div className='waterfull-text' ref={ref => this.hasNoMore = ref}>{this.hasNoMoreText}</div>
                <div className='waterfull-text' ref={ref => this.loadError = ref}>抱歉，出错了。(ノへ`、)</div>
            </div>
        );
    }
}
