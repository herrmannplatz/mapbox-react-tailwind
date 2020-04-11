import React, { useState, useEffect } from 'react';
import {useDrop} from 'react-use';
import ReactMapGL, {Source, Layer, NavigationControl, ScaleControl} from 'react-map-gl';
import { kml, gpx } from '@tmcw/togeojson'
import { lineLayer, pointLayer } from './lib/map-style'
import { geojsonToViewport } from './lib/geojson-to-viewport'
import { readAsXml, xmlToString } from './lib/xml'
import Layout from './components/Layout'

import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewport = {
  latitude: 37.785164,
  longitude: -122.4,
  zoom: 11
}

const Map = ({data}) => {
  const [viewport, setViewport] = useState(initialViewport)

  useEffect(() => {
    if (data) {
      setViewport(geojsonToViewport(data, {
        viewport: { width: 100, height: 100, ...initialViewport }
      }))
    }
  }, [data])

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Source type="geojson" data={data}>
        <Layer {...lineLayer} />
        <Layer {...pointLayer} />
      </Source>

      <div className="absolute top-3 left-0 p-3">
        <NavigationControl />
      </div>
      <div className="absolute top-0 right-0 p-3">
        <ScaleControl />
      </div>
    </ReactMapGL>
  );
}
const Sidebar = ({onSelectFiles}) => (
  <div className="w-16 bg-gray-800">
    <label className="inline-block box-border cursor-pointer text-white m-2 p-2 hover:bg-gray-900 rounded-md">
      <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="heroicon-ui" d="M13 5.41V17a1 1 0 0 1-2 0V5.41l-3.3 3.3a1 1 0 0 1-1.4-1.42l5-5a1 1 0 0 1 1.4 0l5 5a1 1 0 1 1-1.4 1.42L13 5.4zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/></svg>
      <input className="hidden" type="file" id="input" onChange={e => onSelectFiles(e.target.files)} />
    </label>
  </div>
)

const filesToGeoJSON = setValue => async files => {
  const xml = await readAsXml(files[0])
  setValue(xmlToString(xml).includes('kml') ? kml(xml) : gpx(xml))
}

function App() {
  const [data, setData] = useState(null)

  const {over} = useDrop({
    onFiles: filesToGeoJSON(setData),
  });

  return (
    <Layout className={over ? 'opacity-75' : ''}>
      <Sidebar onSelectFiles={filesToGeoJSON(setData)} />
      <Map data={data}/>
    </Layout>
  );
}

export default App;
