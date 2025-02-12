import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';

export const countryStyle = new Style({
  image: new CircleStyle({
    radius: 10,
    fill: new Fill({
      color: 'yellow',
    }),
  }),
});

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
