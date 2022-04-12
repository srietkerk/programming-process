window.onload = init;

const data = {
	"type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-13042313.99, 3857628.41]
      },
      "properties": {
        "name": "San Diego, CA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-13279535.83, 4346152.02]
      },
      "properties": {
        "name": "Visalia, CA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-13157262.50, 3997973.69]
      },
      "properties": {
        "name": "Long Beach, CA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-8582142.75, 4719480.22]
      },
      "properties": {
        "name": "Bethesda, MD"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-13436930.46, 4238836.38]
      },
      "properties": {
        "name": "Templeton, CA"
      }
    },

  ]
};

function init() {
  const features = data.features.map((feature) => {
    return new ol.Feature(new ol.geom.Point(feature.geometry.coordinates));
  });

  const vectorSourceTest = new ol.source.Vector({
    features,
  });

  const colorArray = ['#df220f', '#fec94c', '#00ff00', '#61d2f2', '#c29dfd' ];
  let count = 0;

  const styleCache = {};
  const vectorLayer = new ol.layer.VectorImage({
    source: vectorSourceTest,
    visible: true,
    style: function (feature) {
      const olUID = feature.ol_uid;
      let style = styleCache[olUID];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: '#fff',
            }),
            fill: new ol.style.Fill({
              color: colorArray[count],
            }),
          }),
        });
        styleCache[olUID] = style;
        count++;
      }
      return style;
    },
    title: 'Data points'
  });

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-120.66, 35.28]),
      zoom: 10,
    })
  });
}