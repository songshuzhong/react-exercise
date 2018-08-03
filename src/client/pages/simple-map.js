import React, { Component } from 'react';
import { utilCityCenter } from 'mapv';

import Map from '../components/map/map';
import Arc from '../components/map/arc';
import Marker from '../components/map/component/marker';

import '../styles/simple-map.css';

const simpleMapStyle = {
  styleJson: [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": {
        "lightness": 41,
        "saturation": -70
      }
    }
  ]
};

const data = [
  {
    color: 'red',
    from: {
      city: '北京'
    },
    to: {
      city: '南京'
    }
  },
  {
    from: {
      city: '北京',
    },
    to: {
      name: '哈哈',
      point: {
        lng: 101.45934,
        lat: 39.135305
      }
    }
  },
  {
    from: {
      city: '北京'
    },
    to: {
      city: '成都'
    }
  },
  {
    from: {
      city: '北京'
    },
    to: {
      city: '广州'
    }
  }
];

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    let center = utilCityCenter.getCenterByCityName('北京');
    let icon = new BMap.Icon('http://wiki.lbsyun.baidu.com/cms/images/huiyan_od_marker.png', new BMap.Size(66 / 2, 82 / 2), {
      imageSize: new BMap.Size(66 / 2, 82 / 2),
      anchor: new BMap.Size(66 / 2 / 2, 82 / 2 - 10)
    });
    return (
      <Map style={{height: '400px'}} mapStyle={simpleMapStyle} center={{lng: 105.403119, lat: 38.328658}} zoom='13'>
        <Arc enableAnimation={true} showFromPoint={false} showToPoint={true} data={ data } />
        <Marker icon={icon} position={center} />
      </Map>
    )
  }
}

export { App };
export default App;

