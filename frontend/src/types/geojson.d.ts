import GeoJSON from "ol/format/GeoJSON";

declare module '*.geojson' {
  const value: GeoJSON;
  export default value;
}
