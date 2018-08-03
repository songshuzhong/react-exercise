import React, { Component } from 'react';

import toolConstantsList from './tool-constants';

class BaiduMap extends Component {
  static defaultProps = {
    center: [
      116.307698,
      40.056975
    ],
    zoom: 5,
    style: { height: '100%', width: '100%' },
    scaleControl: false,
    mapTypeControl: false,
    navigationControl: false,
    overviewMapControl: false,
    cityListControl: false
  };
  constructor( props ) {
    super( props );

    this.generateSrcDoc = this.generateSrcDoc.bind( this );
    this.handleGetter = this.handleGetter.bind( this );
  }

  componentDidMount() {
    this.handleGetter();
  }

  generateSrcDoc() {
    const { ak, center, zoom, scaleControl, mapTypeControl, navigationControl, overviewMapControl, cityListControl } = this.props;

    const srcDoc = ( `
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <style type="text/css">
        body, html, #allmap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin:0;
        }
        </style>
        <script type="text/javascript" src="//api.map.baidu.com/api?v=3.0&ak=${ ak }"></script>
        <title>地图展示</title>
      </head>
      <body>
        <div id="allmap"></div>
      </body>
      <script type="text/javascript">
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        
        map.centerAndZoom( new BMap.Point( ${ center[ 0 ] }, ${ center[ 1 ] } ), ${ zoom } ); // 设置中心点及缩放等级
        map.enableScrollWheelZoom( true );  // 开启滚轮缩放
        
        // 是否添加缩放控件
        if( ${ JSON.stringify( scaleControl ) } ){
          
          const _scaleControl = ${ JSON.stringify( scaleControl ) };
          
          if( _scaleControl instanceof Object ){
            map.addControl(new BMap.ScaleControl( _scaleControl ));
          }else {
            map.addControl(new BMap.ScaleControl());
          }
        }
        
        // 是否添加地图类型控件
        if( ${ JSON.stringify( mapTypeControl ) } ){
          
          const _mapTypeControl = ${ JSON.stringify( mapTypeControl ) };
          
          if( _mapTypeControl instanceof Object ){
            map.addControl(new BMap.MapTypeControl( _mapTypeControl ));
          }else {
            map.addControl(new BMap.MapTypeControl());
          }
        }
        
        // 是否添加默认缩放平移控件
        if( ${ JSON.stringify( navigationControl ) } ){
          
          const _navigationControl = ${ JSON.stringify( navigationControl ) };
          
          if( _navigationControl instanceof Object ){
            map.addControl(new BMap.NavigationControl( _navigationControl ));
          }else {
            map.addControl(new BMap.NavigationControl());
          }
        }
        
        // 是否添加缩略图控件
        if( ${ JSON.stringify( overviewMapControl ) } ){
          
          const _overviewMapControl = ${ JSON.stringify( overviewMapControl ) };
          
          if( _overviewMapControl instanceof Object ){
            map.addControl(new BMap.OverviewMapControl( _overviewMapControl ));
          }else {
            map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
          }
        }
        
        // 是否添加城市列表控件
        if( ${ JSON.stringify( cityListControl ) } ){
          const _cityListControl = ${ JSON.stringify( cityListControl ) };
          
          if( _cityListControl instanceof Object ){
            map.addControl(new BMap.CityListControl( _cityListControl ));
          }else {
            map.addControl(new BMap.CityListControl());
          }
        }
      </script>
      </html>
    `.trim() );

    return srcDoc;
  }

  handleGetter() {
    if ( this.props.getter && this.props.getter instanceof Function ) {
      const toolsPromise = new Promise( ( resolve, reject ) => {
        let count = 0;
        const runTime = 100;
        const totalTime = 15000;
        const id = window.setInterval( () => {
          count++;
          if ( count >= totalTime / runTime ) {
            window.clearInterval( id );
            reject( { mgs: 'Timeout when loading Baidu map, please check the network' } );
          }

          if ( this.iframe.contentWindow.map ) {
            window.clearInterval( id );

            const toolConstants = {};

            toolConstantsList.forEach( ( key ) => {
              toolConstants[ key ] = this.iframe.contentWindow[ key ];
            } );

            resolve( {
              msg: 'success',
              map: this.iframe.contentWindow.map,
              BMap: this.iframe.contentWindow.BMap,
              toolConstants
            } );
          }
        }, runTime )
      } );

      this.props.getter( { toolsPromise } );
    }
  }

  render() {
    const { style } = this.props;

    return (
      <div className="baidu-wrapper" style={ style }>
        <iframe ref={ ( iframe ) => { this.iframe =  iframe } } srcDoc={ this.generateSrcDoc() } frameBorder='0' style={ { height: '100%', width: '100%' } } />
      </div>
    );
  }
}

export { BaiduMap };
export default BaiduMap;