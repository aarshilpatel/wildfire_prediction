import React from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

const INITIAL_VIEW_STATE = {
  longitude: -103.75,
  latitude: 40.73,
  zoom: 2,
  maxZoom: 16,
  pitch: 50,
  bearing: 0
};

export const colorRange = [
    [200, 50, 50],
    [73, 227, 206],
    [216, 254, 181],
    [210, 200, 200],
    [230, 110, 10],
    [250, 255, 78]
    // [65, 182, 196],
    // [254, 178, 76],
    // [253, 141, 60],
    // [252, 78, 42],
    // [227, 26, 28],
    // [189, 0, 38],
  ];


export default function WildfireHeatMap(props) {
    const tooltip = props.tooltip;
    // const handleHover = this.props.handleHover;
    const data = props.wildfireData;
    const oldDataToggle = props.oldDataToggle;
    const colorRange2 = props.colorRange2;
    const intensity = 1;
    const threshold = 0.03;
    const radiusPixels = 3;
    const mapStyle = props.mapStyle;
    const layers = [
        new HeatmapLayer({
          data,
          id: 'heatmp-layer-custom',
          pickable: false,
          getPosition: d => [d.longitude, d.latitude],
          getWeight: d => d.predicted_fire,
          radiusPixels,
          intensity,
          colorRange,
          threshold
        })
      ];
      {console.log(data)};
    

    return(
        
        <DeckGL 
            initialViewState={INITIAL_VIEW_STATE} 
            controller={true} 
            style={{position: 'relative'}}
            // onHover={(event) => this.props.handleHover(event)}
            layers={layers}>
            <StaticMap 
                reuseMaps 
                mapStyle={mapStyle} 
                preventStyleDiffing={true} 
            />
      </DeckGL>
      

    );
}