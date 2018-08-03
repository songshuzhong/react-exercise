import React from 'react';

import Component from './component/component';

export default class Map extends Component {
  constructor( props ) {
    super( props );
  }

  static get defaultProps () {
    return {
      style: { height: '350px' }
    };
  }

  get events() {
    return [
      'click',
      'dblclick',
      'rightclick',
      'rightdblclick',
      'maptypechange',
      'mousemove',
      'mouseover',
      'mouseout',
      'movestart',
      'moving',
      'moveend',
      'zoomstart',
      'zoomend',
      'addoverlay',
      'addcontrol',
      'removecontrol',
      'removeoverlay',
      'clearoverlays',
      'dragstart',
      'dragging',
      'dragend',
      'addtilelayer',
      'removetilelayer',
      'load',
      'resize',
      'hotspotclick',
      'hotspotover',
      'hotspotout',
      'tilesloaded',
      'touchstart',
      'touchmove',
      'touchend',
      'longpress'
    ];
  }

  get toggleMethods() {
    return {
      enableScrollWheelZoom: ['enableScrollWheelZoom', 'disableScrollWheelZoom'],
      enableDragging: ['enableDragging', 'disableDragging'],
      enableDoubleClickZoom: ['enableDoubleClickZoom', 'disableDoubleClickZoom'],
      enableKeyboard: ['enableKeyboard', 'disableKeyboard'],
      enableInertialDragging: ['enableInertialDragging', 'disableInertialDragging'],
      enableContinuousZoom: ['enableContinuousZoom', 'disableContinuousZoom'],
      enablePinchToZoom: ['enablePinchToZoom', 'disablePinchToZoom'],
      enableAutoResize: ['enableAutoResize', 'disableAutoResize'],
    }
  }

  get options() {
    return [
      'minZoom',
      'maxZoom',
      'mapType',
      'enableMapClick'
    ];
  }

  componentDidMount() {
    this.initMap();
    this.forceUpdate();
  }

  componentDidUpdate( prevProps ) {
    var preCenter = prevProps.center;
    var center = this.props.center;

    if ( Object.prototype.toString.call( center ) === "[object String]" ) {
      if ( preCenter !== center ) {
        this.map.centerAndZoom( center );
      }
    } else {
      var isCenterChanged = preCenter && center && preCenter.lng != this.props.center.lng || preCenter.lat != this.props.center.lat;
      let isZoomChanged = preCenter.zoom !== this.props.zoom && this.props.zoom || this.props.forceUpdate();
      let center = new BMap.Point( this.props.center.lng, this.props.center.lat );

      if ( isCenterChanged && isZoomChanged ) {
        this.map.centerAndZoom( center, this.props.zoom );
      } else if ( isCenterChanged ) {
        this.map.setCenter( center );
      } else if ( isZoomChanged ) {
        this.map.zoomTo( this.props.zoom );
      }
    }
  }

  initMap() {
    let options = this.options;
    options = this.getOptions( options );

    if ( this.props.enableMapClick !== true ) {
      options.enableMapClick = false;
    }
    let map = new BMap.Map( this.refs.map, options );

    this.map = map;
    if ( this.props.mapStyle ) {
      map.setMapStyle( this.props.mapStyle );
    }

    let zoom = this.props.zoom;
    this.bindEvent( map, this.events );

    if ( Object.prototype.toString.call( this.props.center ) === "[object String]" ) {
      map.centerAndZoom( this.props.center );
    } else {
      let center = new BMap.Point( this.props.center.lng, this.props.center.lat );
      map.centerAndZoom( center, zoom );
    }

    this.bindToggleMeghods( map, this.toggleMethods );

    let lastZoom = zoom;
    map.addEventListener( 'zoomend', () => {
      let zoom = map.getZoom();
      this.props.zoom_Changed && this.props.zoom_changed( zoom, lastZoom );
      lastZoom = zoom;
    } );
  }

  renderChildren() {
    const { children } = this.props;

    if ( !children || !this.map ) return;

    return React.Children.map( ( children, child ) => {
      if ( !child ) { return; }
      if ( typeof child.type === 'string' ) {
        return child;
      } else {
        return React.cloneElement( child, { map: this.map } )
      }
    } );
  }

  onRender() {
    if ( !this.props.render || !this.map ) {
      return;
    }

    return this.props.render( this.map );
  }

  render() {
    let style = { height: '100%', position: 'relative' };

    for ( let key in this.props.style ) {
      style[ key ] = this.props.style[ key ];
    }

    return (
      <div style={ style } key={ this.props.key }>
        <div ref='map' className={ this.props.className } style={{ height: '100%'}}>
          地图加载中。。。
        </div>
        { this.renderChildren() }
        { this.onRender() }
      </div>
    );
  }
}