import GeoJSON from 'ol/format/GeoJSON';
import type { Map } from 'ol';
import type VectorLayer from 'ol/layer/Vector';
import type VectorSource from 'ol/source/Vector';

type CountryName = string;
export interface MapClickHandlerOptions {
  countryLayer: VectorLayer<VectorSource>;
  expeditionLayer: VectorLayer<VectorSource>;
  coastlineLayer: VectorLayer<VectorSource>;
  selectCountry: (properties: any) => void;
  selectExpedition: (properties: any) => void;
  threeDMappingByCountry: Record<CountryName, any>;
  expeditionsByCountry: Record<CountryName, any>;
  selectedCountryStyle: any;
  zoomToCountry: () => void;
  zoomToExpedition: () => void;
}

export function addMapClickHandler(
  map: Map,
  options: MapClickHandlerOptions
): void {
  map.on('click', (evt) => {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      const properties = feature.getProperties();
      if (properties.type === 'country') {
        // Update the store via callback
        onCountryClick(properties, options);
      } else if (properties.type === 'Expedition') {
        // Update the store via callback
        onExpeditionClick(properties, options);
      }
      // Update coastline layer based on the selected country
      if (properties.type === 'country' && properties.coastline) {
        const coastlineFeature = new GeoJSON().readFeature(
          properties.coastline,
          {
            featureProjection: 'EPSG:4326',
          }
        );
        options.coastlineLayer.getSource().clear();
        options.coastlineLayer.getSource().addFeature(coastlineFeature);
      }
    });
  });
}

function onCountryClick(properties: any, options: MapClickHandlerOptions) {
  // add any extra rawData if needed
  properties.rawData = options.threeDMappingByCountry['Djibouti'];
  options.selectCountry(properties);
  // Set a new style on the country layer if needed
  options.countryLayer.setStyle(options.selectedCountryStyle);
  options.zoomToCountry();

  if (properties.name === 'Djibouti') {
    // I guess expeditionsByCountry is a dictionary of GeoJSON data
    // and rawData is for 3D Mapping
    const expeditionFeatures = new GeoJSON().readFeatures(options.expeditionsByCountry['Djibouti'], {
      featureProjection: 'EPSG:4326',
    });
    options.expeditionLayer?.getSource()?.clear();
    options.expeditionLayer?.getSource()?.addFeatures(expeditionFeatures);
  } else {
    options.expeditionLayer?.getSource()?.clear();
  }
}

function onExpeditionClick(properties: any, options: MapClickHandlerOptions) {
  options.selectExpedition(properties);
  options.zoomToExpedition();
}
