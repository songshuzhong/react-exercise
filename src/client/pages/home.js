import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {observer, inject} from 'mobx-react';

import ThunderHK from '../../utils/thunderHK';
import '../styles/home.css';

@inject('store')
@observer
class Home extends Component {
    constructor(props) {
        super(props);

        this.store = this.props.store.homeStore;
        this.minus = this.store.minus;
        this.plus = this.store.plus;
        this.sendLog = this.sendLog.bind(this);
    }

    componentDidMount() {
        this.thunder = ThunderHK.getInstance();
        this.thunder.sendLog({
            cst: 1,
            tid: 10547,
            ct: 8,
            logInfo: 'haokan_web',
            logFrom: 'feed',
            logExtra: {
                st: 'video',
                t: new Date().getTime(),
                tab: 'haokan_web',
                entry: 'hk_pc'
            }
        });
    }

    sendLog() {
        this.thunder.sendLog({
            cst: 2,
            tid: 1024596,
            ct: 8,
            logInfo: 'hb_bangdan',
            logFrom: 'feed',
            logExtra: {
                st: 'video',
                tab: 'haokan_web',
                entry: 'hk_pc'
            }
        });
    }

    minusHandle() {
        this.minus();
    }

    plusHandle() {
        this.plus();
    }

    render() {
        let {number} = this.store;

        return [
            <title key={1}>Home</title>,
            <div key={ 2 } style={{
                textAlign: 'center'
            }}>
        <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.minusHandle.bind(this)}>-</span>
        <span>{ number }</span>
        <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.plusHandle.bind(this)}>+</span>
      </div>
        ];
    }
}

export { Home };
export default Home;
