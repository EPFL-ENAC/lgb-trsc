import type { Map } from 'ol';
import type { FeatureLike } from 'ol/Feature';
import { useLayerController } from 'maps/composables/useLayerController';
import { useMapController } from 'maps/composables/useMapController';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import MapBrowserEvent from 'ol/MapBrowserEvent';

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

    // Cast to MapBrowserEvent to access originalEvent
    const mapBrowserEvent = evt as MapBrowserEvent<PointerEvent>;
    const pixel = map.getEventPixel(mapBrowserEvent.originalEvent);
    const target = mapBrowserEvent.originalEvent.target;
    // const hit = map.hasFeatureAtPixel(pixel);
    const validExpeditons = [
      'exploration',
      'monitoring',
      'by year',
      'by project',
      'hard coral cover',
    ];
    const feature: FeatureLike | undefined =
      target instanceof HTMLElement && target.closest('.ol-control')
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
      onExpeditionClick(properties);
    }
  };

export function addMapClickHandler(
  map: Map,
  options: MapClickHandlerOptions
): EventsKey {
  const onClickEventsKey = map.on('click', clickHandlerFn(map, options));
  return onClickEventsKey;
}

function onCountryClick(properties: any, options: MapClickHandlerOptions) {
  const layerController = useLayerController();
  if (properties.name === 'Djibouti') {
    // use mapStore to zoom to country
    layerController.updateExpeditions(options.expeditionsByCountry['Djibouti']);
    properties.rawData = options.threeDMappingByCountry['Djibouti'];

    const mapController = useMapController();
    mapController.zoomToCountry(properties);
  }
}

function onExpeditionClick(properties: any) {
  const mapController = useMapController();
  mapController.zoomToExpedition(properties);
}
