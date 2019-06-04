import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UpbangAction } from '../../../../action/upbang';
import { UpbangStore } from '../../../../store/upbang';

import { Waterfull } from '../../../../components/common/waterfull';

import './index.less';

interface Props {
    height: string
    triger(sign, dy): any
    UpbangStore?: UpbangStore
    UpbangAction?: UpbangAction
}
@inject('UpbangStore', 'UpbangAction') @observer
export class List extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            list: ['这是第1个Item', '这是第1个Item', '这是第1个Item', '这是第1个Item', '这是第1个Item', '这是第1个Item']
        };
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    loadMore(disappear, show) {
        let { list } = this.state;
        new Promise((resolve, reject) => {
            let timeOut = Math.random() * 2;
            setTimeout(() => {
                if (timeOut < 1) {
                    disappear();
                    list.push('这是第1个Item');
                    this.setState({list});
                    resolve(['这是第1个Item', '这是第1个Item', '这是第1个Item']);
                } else {
                    show();
                    reject('timeout in ' + timeOut + ' seconds.');
                }
            }, timeOut * 1000);
        });
    }

    refresh(show, disappear) {
        const { list } = this.state;
        list.splice(5);
        this.setState({list}, () => disappear())
    }

    render() {
        const { list } = this.state;

        return (
            <div className='hk-list-wrapper'>
                <Waterfull height='calc(100vh - 138px)' onLoadMore={this.loadMore} onRefresh={this.refresh} triger={this.props.triger}>
                    {
                        list ? list.map((item, index) => <h5 key={index}>{item}</h5>) : null
                    }
                </Waterfull>
            </div>
        );
    }
}
