import {WebMercatorViewport} from 'react-map-gl';
import bbox from '@turf/bbox';

export const geojsonToViewport = (geojson, options) => {
  const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
  const viewport = new WebMercatorViewport({ ...options.viewport });
  return viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
    padding: 0
  });
}