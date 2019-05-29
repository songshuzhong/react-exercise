/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import React, { Component } from "react";

function asyncRouter(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({ component });
    }

    render() {
      // @ts-ignore
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

export { asyncRouter };
export default asyncRouter;
