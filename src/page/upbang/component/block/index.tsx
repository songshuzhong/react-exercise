import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UpbangAction } from '../../../../action/upbang';
import { UpbangStore } from '../../../../store/upbang';

import './index.less';

interface Props {
    index?: number
    block?: any
    UpbangStore?: UpbangStore
    UpbangAction?: UpbangAction
}
@inject('UpbangStore', 'UpbangAction') @observer
export class Block extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { index } = this.props;

        return (
            <div className='hk-block-wrapper'>
                <div className='block-index'>{index}</div>
                <img className='block-rank'/>
                <div className='block-detail'>
                    这是第{index}个Item。
                </div>
                <div className='block-work'></div>
            </div>
        );
    }
}
