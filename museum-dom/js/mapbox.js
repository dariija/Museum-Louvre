mapboxgl.accessToken = 'pk.eyJ1IjoiZGFydXlhIiwiYSI6ImNrdWo4a3BhcDEwdXgybm5td2tvMjUyNTgifQ.svsUILnfbCcqx_JzTzHqCQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 15.5,
    center: [2.336335082066088, 48.86096049094805]
});

map.on('load', () => {
    map.addSource('mapillary', {
        'type': 'vector',
        'tiles': [
            'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}'
        ],
        'minzoom': 6,
        'maxzoom': 14
    });
    map.addLayer(
        {
            'id': 'mapillary', 
            'type': 'line',
            'source': 'mapillary', 
            'source-layer': 'sequence',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-opacity': 0.6,
                'line-color': 'rgb(53, 175, 109)',
                'line-width': 2
            }
        },
        'road-label'
    );
});

const markerPyramide = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([2.336335082066088, 48.86096049094805])
    .addTo(map);

const markerPonte = new mapboxgl.Marker({ color: '#797979' })
    .setLngLat([2.333180804520765, 48.860311115938345])
    .addTo(map);

const markerArc = new mapboxgl.Marker({ color: '#797979' })
    .setLngLat([2.3329447700246297, 48.8619557123853])
    .addTo(map);

const markerPalais = new mapboxgl.Marker({ color: '#797979' })
    .setLngLat([2.3365818451534204, 48.86252742638817])
    .addTo(map);

const markerLouvre = new mapboxgl.Marker({ color: '#797979' })
    .setLngLat([2.339661020852426, 48.860741680746145])
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
