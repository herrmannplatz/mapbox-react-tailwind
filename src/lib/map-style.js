export const geojsonLayer = {
  'id': 'lines',
  'type': 'line',
  'source': 'lines',
  'paint': {
  'line-width': 3,
  // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
  // to set the line-color to a feature property value.
  'line-color': ['get', 'color']
  }
}