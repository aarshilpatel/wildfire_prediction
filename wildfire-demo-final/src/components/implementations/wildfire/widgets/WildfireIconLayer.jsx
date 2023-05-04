// import React, {Component} from 'react';
// // import {createRoot} from 'react-dom/client';
// import {StaticMap} from 'react-map-gl';
// // import maplibregl from 'maplibre-gl';
// import DeckGL from '@deck.gl/react';
// import {MapView} from '@deck.gl/core';
// import {IconLayer} from '@deck.gl/layers';
// import IconClusterLayer from './icon-cluster-layer';

// const INITIAL_VIEW_STATE = {
//   longitude: -103.75,
//   latitude: 40.73,
//   zoom: 2,
//   maxZoom: 16,
//   pitch: 50,
//   bearing: 0
// };

// const MAP_VIEW = new MapView({repeat: true});
// export const colorRange = [
//     [200, 50, 50],
//     [73, 227, 206],
//     [216, 254, 181],
//     [210, 200, 200],
//     [230, 110, 10],
//     [250, 255, 78]
//     // [65, 182, 196],
//     // [254, 178, 76],
//     // [253, 141, 60],
//     // [252, 78, 42],
//     // [227, 26, 28],
//     // [189, 0, 38],
//   ];

// // export function renderTooltip(info) {
// //     const {object, x, y} = info;

// //     if (info.objects) {
// //         return (
// //         <div className="tooltip interactive" style={{left: x, top: y}}>
// //             {info.objects.map(({longitude, latitude, predicted_fire}) => {
// //             return (
// //                 <div key={longitude}>
// //                 <h5></h5>
// //                 <div>Longitude: {longitude || 'unknown'}</div>
// //                 <div>Latitude: {latitude}</div>
// //                 <div>Size: {predicted_fire}</div>
// //                 </div>
// //             );
// //             })}
// //         </div>
// //         );
// //     }
// //     if (!object) {
// //         return null;
// //     }
// //     return object.cluster ? (
// //         <div className="tooltip" style={{left: x, top: y}}>
// //             {/* {object.point_count} records */}
// //             records 
// //         </div>
// //         ) : (
// //         <div className="tooltip" style={{left: x, top: y}}>
// //             {object.longitude} {object.latitude ? `(${object.predicted_fire})` : ''}
// //         </div>
// //         );
// //     }      
// export default function WildfireIconLayer(props) {
//     const tooltip = props.tooltip;
//     const hoverInfo = props.hoverInfo;
//     // const handleHover = this.props.handleHover;
//     const data = props.wildfireData;
//     const oldDataToggle = props.oldDataToggle;
//     // const colorRange2 = props.colorRange2;
//     const intensity = 1;
//     const threshold = 0.03;
//     const radiusPixels = 3;
//     const mapStyle = props.mapStyle;
//     const iconMapping = 'data/location-icon-mapping.json';
//     const iconAtlas = 'data/location-icon-atlas.png';
//     const showCluster = true;
//     const ICON_MAPPING = {
//         marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
//       };
   
//     const layerProps = {
//         data,
//         pickable: true,
//         getPosition: (d) => [d.longitude, d.latitude],
//         iconAtlas,
//         iconMapping,
//         onHover: !hoverInfo.objects && ((info) => this.setState({ hoverInfo: info })),
//       };
  
//     const layer = new IconClusterLayer({...layerProps, id: 'icon-cluster', sizeScale: 40})
//     // : new IconLayer({
//     //     ...layerProps,
//     //     id: 'icon',
//     //     getIcon: d => 'marker',
//     //     sizeUnits: 'meters',
//     //     sizeScale: 2000,
//     //     sizeMinPixels: 6
//     //   });
//     //   {console.log(data)};

//     // const layer = new IconLayer({
//     //     id: 'icon-layer',
//     //     data,
//     //     pickable: true,
//     //     // iconAtlas and iconMapping are required
//     //     // getIcon: return a string
//     //     iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
//     //     iconMapping: ICON_MAPPING,
//     //     getIcon: d => 'marker',
    
//     //     sizeScale: 15,
//     //     getPosition: d => [d.longitude, d.latitude],
//     //     getSize: d => 5,
//     //     getColor: d => [Math.sqrt(d.exits), 140, 0]
//     //   });
    

//     return(
//         // <div>hello</div>
//         <DeckGL 
//             initialViewState={INITIAL_VIEW_STATE} 
//             controller={true} 
//             style={{position: 'relative'}}
//             // onHover={(event) => this.props.handleHover(event)}
//             // onViewStateChange={this.hideTooltip}
//             // onClick={this.expandTooltip}
//             layers={[layer]}>
//             <StaticMap reuseMaps  mapStyle={mapStyle} preventStyleDiffing={true} />
//             {/* {this.renderTooltip(hoverInfo)} */}
//         </DeckGL>
      

//     );
// }


import React, {useState} from 'react';
// import {createRoot} from 'react-dom/client';
import {StaticMap} from 'react-map-gl';
// import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import {MapView} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';

import IconClusterLayer from './icon-cluster-layer';

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'; // eslint-disable-line

const MAP_VIEW = new MapView({repeat: true});
const INITIAL_VIEW_STATE = {
  longitude: -35,
  latitude: 36.7,
  zoom: 1.8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

function renderTooltip(info) {
  const {object, x, y} = info;

  if (info.objects) {
    return (
      <div className="tooltip interactive" style={{left: x, top: y}}>
        {info.objects.map(({name, year, mass, class: meteorClass}) => {
          return (
            <div key={name}>
              <h5>{name}</h5>
              <div>Year: {year || 'unknown'}</div>
              <div>Class: {meteorClass}</div>
              <div>Mass: {mass}g</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (!object) {
    return null;
  }

  return object.cluster ? (
    <div className="tooltip" style={{left: x, top: y}}>
      {object.point_count} records
    </div>
  ) : (
    <div className="tooltip" style={{left: x, top: y}}>
      {object.name} {object.year ? `(${object.year})` : ''}
    </div>
  );
}

/* eslint-disable react/no-deprecated */
export default function WildfireIconLayer(props){
    // const data = props.wildfireData;
    const data = DATA_URL;
    const iconMapping = 'widgets/data/location-icon-mapping.json';
    const iconAtlas = 'widgets/data/location-icon-atlas.png';
    // const tooltip = props.tooltip;
    // const hideTooltip = props.hideTooltip;
    // const expandTooltip = props.expandTooltip;
    const hoverInfo = props.hoverInfo;
    const mapStyle = props.mapStyle;

    // const [hoverInfo, setHoverInfo] = useState({});

    // const hideTooltip = () => {
    //     setHoverInfo({});
    // };
    // const expandTooltip = info => {
    //     if (info.picked) {
    //     setHoverInfo(info);
    //     } else {
    //     setHoverInfo({});
    //     }
    // };

    const layerProps = {
        data,
        pickable: true,
        getPosition: d => d.coordinates,
        iconAtlas,
        iconMapping,
        onHover: !hoverInfo.objects && ((info) => this.setState({ hoverInfo: info })),
    };

    const layer = new IconClusterLayer({...layerProps, id: 'icon-cluster', sizeScale: 40})
        // : new IconLayer({
        //     ...layerProps,
        //     id: 'icon',
        //     getIcon: d => 'marker',
        //     sizeUnits: 'meters',
        //     sizeScale: 2000,
        //     sizeMinPixels: 6
        // });

    return (
        <DeckGL
        layers={[layer]}
        views={MAP_VIEW}
        initialViewState={INITIAL_VIEW_STATE}
        controller={{dragRotate: false}}
        onViewStateChange={props.hideTooltip}
        onClick={props.expandTooltip}
        >
        <StaticMap reuseMaps  mapStyle={mapStyle} preventStyleDiffing={true} />

        {renderTooltip(hoverInfo)}
        </DeckGL>
    );
    }

