import * as React from 'react';
import { Provider } from 'mobx-react';

import { injectInstance } from './inject-instance';
// import { ApplicationAction } from '../action/application';
// import { ApplicationStore } from '../store/application';
const assign = require('lodash/assign');

interface IPropsType {
    inject?: { [storeActionName: string]: any }
    [x: string]: any
}
export class ProviderContainer extends React.Component<any, any> {
    private providerActionAndStores: {
        [injectName: string]: any
    } = {};

    componentWillMount() {
        const instances = injectInstance(
            // assign({}, { ApplicationStore }, { ApplicationAction }, this.props.inject)
            assign({}, this.props.inject)
        );
        // instances.get('ApplicationStore').init((window as any).__PRELOADED_STATE__);
        this.providerActionAndStores = {};
        instances.forEach((value, key) => {
            this.providerActionAndStores[key] = value;
        });
    }

    render() {
        return (
            <Provider {...this.providerActionAndStores}>
                {this.props.children}
            </Provider>
        );
    }
}