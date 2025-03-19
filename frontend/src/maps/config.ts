import { transformExtent } from 'ol/proj';

const rawExtent = [12, 0, 85, 40];

export const defaultExtent = transformExtent(
  rawExtent,
  'EPSG:4326',
  'EPSG:3857'
);

export const defaultZoom = 4;
export const defaultMinZoom = 4;
export const defaultMaxZoom = 6;
export const defaultCenter: [number, number] = [39.0, 21.5];

export const defaultMinZoomCountry = 9;
export const defaultMaxZoomCountry = 17;
export const defaultZoomCountry = 9;

export const defaultMinZoomExpedition = 14;
export const defaultMaxZoomExpedition = 17;
export const defaultZoomExpedition = 14;
