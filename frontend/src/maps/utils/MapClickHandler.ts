import GeoJSON from 'ol/format/GeoJSON';
import type { Map } from 'ol';
import type { FeatureLike } from 'ol/Feature';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';

type CountryName = string;
export interface MapClickHandlerOptions {
  selectCountry: (properties: any) => void;
  selectExpedition: (properties: any) => void;
  threeDMappingByCountry: Record<CountryName, any>;
  expeditionsByCountry: Record<CountryName, any>;
  selectedCountryStyle: any;
}

export const clickHandlerFn =
  (map: Map, options: MapClickHandlerOptions) => (evt: BaseEvent) => {
    if (!map) return;
    const layerController = useLayerController();
    // const { countryLayer, expeditionLayer } = layerController.getLayers();

    const pixel = map.getEventPixel(evt.originalEvent);
    const target = evt.originalEvent.target;
    // const hit = map.hasFeatureAtPixel(pixel);
    const validExpeditons = [
      'Expedition',
      'by year',
      'by project',
      'hard coral cover',
    ];
    const feature: FeatureLike | undefined = target.closest('.ol-control')
      ? undefined
      : map.getFeaturesAtPixel(pixel, {
          hitTolerance: 10,
          layerFilter: (layer) => {
            // Only check specific layers you're interested in
            return (
              layer.get('title') === 'Countries' ||
              validExpeditons.includes(layer.get('title'))
            );
          },
        })[0];
    const properties = feature?.getProperties();
    if (properties?.type === 'country') {
      // Update the store via callback
      onCountryClick(properties, options);
    } else if (validExpeditons.includes(properties?.type)) {
      // Update the store via callback
      onExpeditionClick(properties, options);
    }
  };

export function addMapClickHandler(
  map: Map,
  options: MapClickHandlerOptions
): EventsKey {
  const onClickEventsKey = map.on('click', clickHandlerFn(map, options));
  return onClickEventsKey;
}

export function removeMapClickHandler(
  map: Map | null,
  options: MapClickHandlerOptions
): void {
  return map?.un('click', clickHandlerFn(map, options));
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
  // TODO: fix me later
  // const mapController = useMapController();
  // mapController.zoomToExpedition();
}
