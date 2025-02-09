import GeoJSON from 'ol/format/GeoJSON';
import type { Map } from 'ol';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { clear } from 'console';



type CountryName = string;
export interface MapClickHandlerOptions {
  selectCountry: (properties: any) => void;
  selectExpedition: (properties: any) => void;
  threeDMappingByCountry: Record<CountryName, any>;
  expeditionsByCountry: Record<CountryName, any>;
  selectedCountryStyle: any;
}

export function addMapClickHandler(
  map: Map,
  options: MapClickHandlerOptions
): void {
  map.on('click', (evt) => {


    if (!map) return;
    const layerController = useLayerController();
    const { countryLayer, expeditionLayer } = layerController.getLayers();


    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);

    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
      const properties = feature.getProperties();
      if (properties.type === 'country') {
        // Update the store via callback
        onCountryClick(properties, options);
      } else if (properties.type === 'Expedition') {
        // Update the store via callback
        onExpeditionClick(properties, options);
      }
      // Update coastline layer based on the selected country
      // if (properties.type === 'country' && properties.coastline) {
      //   const coastlineFeature = new GeoJSON().readFeature(
      //     properties.coastline,
      //     {
      //       featureProjection: 'EPSG:4326',
      //     }
      //   );
      //   options.coastlineLayer.getSource().clear();
      //   options.coastlineLayer.getSource().addFeature(coastlineFeature);
      // }
    });
  });
}

function onCountryClick(properties: any, options: MapClickHandlerOptions) {
  // add any extra rawData if needed

  const layerController = useLayerController();
  if (properties.name === 'Djibouti') {
    // I guess expeditionsByCountry is a dictionary of GeoJSON data
    // and rawData is for 3D Mapping
   
    layerController.updateExpeditions(options.expeditionsByCountry['Djibouti']);
    properties.rawData = options.threeDMappingByCountry['Djibouti'];
    options.selectCountry(properties);
    // Set a new style on the country layer if needed
    // options.countryLayer.setStyle(options.selectedCountryStyle);
    const mapController = useMapController();
    mapController.zoomToCountry();
  } else {
    // layerController.resetLayers();
  }
}

function onExpeditionClick(properties: any, options: MapClickHandlerOptions) {
  options.selectExpedition(properties);
  const mapController = useMapController();
  mapController.zoomToExpedition();
}
