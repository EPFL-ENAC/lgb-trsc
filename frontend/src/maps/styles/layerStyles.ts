import { Style, Circle as CircleStyle, Fill, Stroke, Icon } from 'ol/style';

export const countryStyle = function(feature) {
  const countryCode = feature.get('country_code') || 'unknown';
  return new Style({
    image: new Icon({
      src: `/flags/${countryCode.toLowerCase()}.webp`,
      scale: 1,
      // Optional: you can adjust anchor if needed
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction'
    })
  });
};

export const expeditionStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 4,
  }),
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: 'blue',
    }),
    stroke: new Stroke({
      color: 'white',
      width: 1,
    }),
  }),
});
