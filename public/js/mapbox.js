/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicmxhd25zcWphODA1IiwiYSI6ImNsMW80Nnl6eDAwZjYza3J6YWYwdTJ6NHAifQ.iNxQZCygKIQmyy5iwbw2Qw';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/rlawnsqja805/cl1o5x98l001b15w9ujp65plc', // style URL,
    scrollZoom: false
    // center: [-74.5, 40] // starting position [lng, lat]
    // starting zoom
    // center: [-118.113491, 34.111745],
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
