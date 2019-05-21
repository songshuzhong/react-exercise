/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date 2019/0424
 *@desc 通用性轮播组件
 */
import React, {Component} from 'react';

import '../../styles/components/carousel.less';

export class Carousel extends Component {
    constructor(props) {
        super(props);
        this.time = this.props.time || 2000;
        this.timer = null;
        this.left = 0;
        this.center = 0;
        this.right = 1;
        this.startX = 0;
        this.startTime = null;
        this.carousel = [];
        this.touchstartHandler = this.touchstartHandler.bind(this);
        this.touchmoveHandler = this.touchmoveHandler.bind(this);
        this.touchendHandeler = this.touchendHandeler.bind(this);
        this.setTransition = this.setTransition.bind(this);
        this.setTransform = this.setTransform.bind(this);
        this.showNext = this.showNext.bind(this);
        this.showPrev = this.showPrev.bind(this);
        this.setPoint = this.setPoint.bind(this);
    }

    componentDidMount() {
        const {pointer, pColor, auto} = this.props;
        const carousel = document.querySelector('.bd-hk-carousel');
        const carouselUl = carousel.querySelector('ul');
        const carouselLis = carouselUl.querySelectorAll('li');
        const points = carousel.querySelector('ol');

        for (let i = 0; i < carouselLis.length; i++) {
            let li = document.createElement('li');
            if (pointer === 'rectangle') {
                li.classList.add('rectangle');
            }
            if (pColor) {
                li.style.borderColor = pColor;
            }
            if (i === 0) {
                li.classList.add('active');
            }
            points.appendChild(li);
        }

        carouselUl.style.height = carouselLis[0].offsetHeight + 'px';
        carouselUl.addEventListener('touchstart', this.touchstartHandler);
        carouselUl.addEventListener('touchmove', this.touchmoveHandler);
        carouselUl.addEventListener('touchend', this.touchendHandeler);

        this.left = carouselLis.length - 1;
        this.carousel = carousel;
        this.carouselLis = carouselLis;
        this.pointsLis = points.querySelectorAll('li');
        this.screenWidth = document.documentElement.offsetWidth;
        this.setTransform();
        if (auto) {
            this.timer = setInterval(this.showNext, this.time);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    showNext() {
        // 轮转下标
        this.left = this.center;
        this.center = this.right;
        this.right++;
        // 极值判断
        if (this.right > this.carouselLis.length - 1) {
            this.right = 0;
        }
        // 添加过渡（多次使用，封装成函数）
        this.setTransition(1, 1, 0);
        // 归位
        this.setTransform();
        // 自动设置小圆点
        this.setPoint();
    }

    showPrev() {
        // 轮转下标
        this.right = this.center;
        this.center = this.left;
        this.left--;
        // 极值判断
        if (this.left < 0) {
            this.left = this.carouselLis.length - 1;
        }
        // 添加过渡
        this.setTransition(0, 1, 1);
        // 归位
        this.setTransform();
        // 自动设置小圆点
        this.setPoint();
    }

    touchstartHandler(e) {
        // 清除定时器
        clearInterval(this.timer);
        // 记录滑动开始的时间
        this.startTime = Date.now();
        // 记录手指最开始的落点
        this.startX = e.changedTouches[0].clientX;
    }

    touchmoveHandler(e) {
        // 获取差值 自带正负
        let dx = e.changedTouches[0].clientX - this.startX;
        // 干掉过渡
        this.setTransition(0, 0, 0);
        // 归位
        this.setTransform(dx);
    }

    touchendHandeler(e) {
        // 在手指松开的时候，要判断当前是否滑动成功
        let dx = e.changedTouches[0].clientX - this.startX;
        // 获取时间差
        let dTime = Date.now() - this.startTime;
        // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
        if (Math.abs(dx) > this.screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
            // 滑动成功了
            // 判断用户是往哪个方向滑
            if (dx > 0) {
                this.showPrev();
            } else {
                this.showNext();
            }
        } else {
            this.setTransition(1, 1, 1);
            // 滑动失败了
            this.setTransform();
        }

        // 重新启动定时器
        clearInterval(this.timer);
        // 调用定时器
        if (this.props.auto) {
            this.timer = setInterval(this.showNext, this.time);
        }
    }

    setTransition(a, b, c) {
        if (a) {
            this.carouselLis[this.left].style.transition = 'transform 1s';
        } else {
            this.carouselLis[this.left].style.transition = 'none';
        }
        if (b) {
            this.carouselLis[this.center].style.transition = 'transform 1s';
        } else {
            this.carouselLis[this.center].style.transition = 'none';
        }
        if (c) {
            this.carouselLis[this.right].style.transition = 'transform 1s';
        } else {
            this.carouselLis[this.right].style.transition = 'none';
        }
    }

    setTransform(dx = 0) {
        this.carouselLis[this.left].style.transform = 'translateX(' + (-this.screenWidth + dx) + 'px)';
        this.carouselLis[this.center].style.transform = 'translateX(' + dx + 'px)';
        this.carouselLis[this.right].style.transform = 'translateX(' + (this.screenWidth + dx) + 'px)';
    }

    setPoint() {
        this.pointsLis[this.left].classList.remove('active');
        this.pointsLis[this.right].classList.remove('active');
        this.pointsLis[this.center].classList.add('active');

        if (this.props.pColor) {
            this.pointsLis[this.center].style.backgroundColor = this.props.pColor;
            this.pointsLis[this.left].style.backgroundColor = '#fff';
            this.pointsLis[this.right].style.backgroundColor = '#fff';
        }
    }

    render() {
        const {onClick} = this.props;
        return (
            <section className="bd-hk-carousel">
                <ul style={this.props.cStyle}>
                    {React.Children.map(this.props.children, (child, i) => (
                        <li key={i}>
                            {React.cloneElement(child, {
                                onClick,
                            })}
                        </li>
                    ))}
                </ul>
                <ol className="points" />
            </section>
        );
    }
}
