import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UpbangAction } from '../../../../action/upbang';
import { UpbangStore } from '../../../../store/upbang';

import './index.less';

interface Props {
    UpbangStore?: UpbangStore
    UpbangAction?: UpbangAction
}
@inject('UpbangStore', 'UpbangAction') @observer
export class Announce extends React.Component<Props, any> {
    private textWrapperRef = null;
    private timeOut = null;
    private timeinterval = null;
    private timer = 0;
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.initFrame = this.initFrame.bind(this);
    }

    componentDidMount() {
        this.timeOut = setTimeout(this.initFrame, 1000);
        this.timeinterval = setInterval(this.loop, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timeinterval);
    }

    initFrame() {
        this.textWrapperRef.style.transitionDuration = '1s';
        clearTimeout(this.timeOut);
    }

    loop() {
        const duration = this.props.UpbangStore.announce.length;
        this.timer += 1;
        if (this.timer >= duration) {
            this.timer = 0;
        }
        const step = 19 * this.timer;
        this.textWrapperRef.style.transform =
            "translate3d(0, " + -step + "px, 0)";
    }

    onAnnounceClick() {}

    render() {
        const { announce } = this.props.UpbangStore;

        return (
            <div className='hk-announce-wrapper'>
                <img />
                <div className='text-wrapper' ref={ref => this.textWrapperRef = ref}>
                    {
                        announce.map((a, i) => <div key={i} onClick={this.onAnnounceClick.bind(this, a)}>{ a }</div>)
                    }
                </div>
            </div>
        );
    }
}
