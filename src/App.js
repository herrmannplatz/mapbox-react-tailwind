import React, { useState } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import togeojson from '@mapbox/togeojson'
import { geojsonLayer } from './lib/map-style'
import { geojsonToViewport } from './lib/geojson-to-viewport'
import { readAsXML } from './lib/read-as-xml'
import Layout from './components/Layout'

const initialViewport = {
  latitude: 37.785164,
  longitude: -122.4,
  zoom: 11
}

const Map = ({data}) => {
  let viewport = {
    ...initialViewport,
    ...(data 
      ? geojsonToViewport(data, {
        viewport: { width: 100, height: 100, ...initialViewport }
      })
      : null)
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Source type="geojson" data={data}>
        <Layer {...geojsonLayer} />
      </Source>
    </ReactMapGL>
  );
}
const Sidebar = ({onSelectFiles}) => (
  <div className="w-16 bg-gray-800">
    <label className="block box-border cursor-pointer text-white m-2 p-2 hover:bg-gray-900 rounded-md">
      <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="heroicon-ui" d="M13 5.41V17a1 1 0 0 1-2 0V5.41l-3.3 3.3a1 1 0 0 1-1.4-1.42l5-5a1 1 0 0 1 1.4 0l5 5a1 1 0 1 1-1.4 1.42L13 5.4zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/></svg>
      <input className="hidden" type="file" id="input" onChange={e => onSelectFiles(e.target.files)} />
    </label>
  </div>
)

function App() {
  const [data, setData] = useState(null)

  const handleChange = async files => {
    const xml = await readAsXML(files[0])
    const geojson = togeojson.kml(xml)
    setData(geojson)
  }

  return (
    <Layout>
      <Sidebar onSelectFiles={handleChange} />
      <Map data={data}/>
    </Layout>
  );
}

export default App;
