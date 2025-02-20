import { transformExtent } from 'ol/proj';

const rawExtent = [12, 0, 85, 40];

export const defaultExtent = transformExtent(
  rawExtent,
  'EPSG:4326',
  'EPSG:3857'
);

export const defaultMinZoom = 3;
export const defaultCenter: [number, number] = [39.0, 21.5];
export const defaultMinZoomCountry = 9;
export const defaultMinZoomExpedition = 12;
