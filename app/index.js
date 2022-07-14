import mapboxgl from 'mapbox-gl';

       mapboxgl.accessToken='pk.eyJ1Ijoic2lhbGRvYmptIiwiYSI6ImNreG9wbjBnMjAyNGwycHRoZmhzcXZ2ZG8ifQ.x0M6GSoS2t5yIbBHpTX41Q';
        const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [114.6185566, -3.314771],
        zoom: 17,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
        });
        
        map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
        
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addSource('wms-test-source', {
            'type': 'raster',
            // use the tiles option to specify a WMS tile source URL
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
            'tiles': [
            'https://www.sialdobjm.com/geoserver/banjarmasin/wms?service=WMS&version=1.1.0&request=GetMap&layers=banjarmasin%3Asungai&bbox=114.52114868164062%2C-3.434570074081421%2C114.71578979492188%2C-3.266552925109863&width=768&height=662&srs=EPSG%3A4326&styles=&format=application/openlayers'
            ],
            'tileSize': 256
            });
        map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                                                'interpolate',
                                                ['linear'],
                                                ['zoom'],
                                                15,
                                                0,
                                                15.05,
                                                ['get', 'height']
                                            ],
                    'fill-extrusion-base': [
                                            'interpolate',
                                            ['linear'],
                                            ['zoom'],
                                            15,
                                            0,
                                            15.05,
                                            ['get', 'min_height']
                                            ],
                                            'fill-extrusion-opacity': 0.6
                }
    
    
        },
        labelLayerId);
        map.addLayer(
        {
        'id': 'wms-test-layer',
        'type': 'raster',
        'source': 'wms-test-source',
        'paint': {}
        },
        labelLayerId
        );
    
        });