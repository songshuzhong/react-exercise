import * as React from 'react';
import { render } from 'react-dom';
import { inject, observer } from 'mobx-react';
import { ProviderContainer } from '../../widget/provider';
import { UpbangAction } from '../../action/upbang';
import { UpbangStore } from '../../store/upbang';

import { Announce } from './component/announce';
import { List } from './component/list';

import './index.less';

interface Props {
    UpbangStore?: UpbangStore
    UpbangAction?: UpbangAction
}
@inject('UpbangStore', 'UpbangAction') @observer
export class App extends React.Component<Props, any> {
    private profile = null;
    constructor(props) {
        super(props);
        this.state = {
            height: '138'
        };
        this.triger = this.triger.bind(this);
    }

    triger(sign, dy) {
        this.setState({height: dy});
        // this.profile.style.transform = 'scale(.5, .5)';
        // this.profile.style.transition = '1s';
    }

    render() {
        const { height } = this.state;
        return (
            <div className='hk-upbang'>
                <Announce />
                <div className='hk-profile-wrapper' ref={ref => this.profile = ref}>
                    <div className='profile-btn'>规则</div>
                    <div className='title'>
                        <span>音你成名海选榜单</span>
                    </div>
                    <div className='time'>距离下次更新排名还有x分x秒</div>
                </div>
                <List triger={this.triger} height={height}/>
            </div>
        );
    }
}

render(
    <ProviderContainer inject={{ UpbangStore, UpbangAction }}>
        <App />
    </ProviderContainer>,
    document.getElementById('root')
);
