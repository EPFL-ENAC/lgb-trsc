import type { Map } from 'ol';
// import type { MapBrowserEvent } from 'ol';
import type { Pixel } from 'ol/pixel';
import { FeatureLike } from 'ol/Feature';
// import { throttle, debounce } from 'lodash';
// import type { DebouncedFunc } from 'lodash';
interface ExpeditionProperties {
  type: 'Expedition' | 'country';
  [key: string]: string | number | boolean;
}

interface MapPointerMoveHandlerOptions {
  onHover?: (expedition: ExpeditionProperties | null, pixel: number[]) => void;
  debounceTime?: number;
  throttleTime?: number;
}

export function addMapPointerMoveHandler(map: Map, options: MapPointerMoveHandlerOptions) {

  const info = document.getElementById('info');

  let currentFeature: FeatureLike | undefined;
  const displayFeatureInfo = (pixel: Pixel, target: unknown) => {
    const feature: FeatureLike | undefined = target.closest('.ol-control')
      ? undefined
      : map.getFeaturesAtPixel(pixel, {
        hitTolerance: 10,
        layerFilter: (layer) => {
          // Only check specific layers you're interested in
          return layer.get('title') === 'Countries' || layer.get('title') === 'Expedition';
        }
      })[0];
    if (info) {
      if (feature) {
        info.style.left = pixel[0] + 'px';
        info.style.top = pixel[1] + 'px';
        const text = feature.get('name') || feature.get('event_id');
        if (feature !== currentFeature && text) {
          info.style.visibility = 'visible';
          info.innerText = feature.get('name') || feature.get('event_id');
        }
      } else {
        info.style.visibility = 'hidden';
      }
    }
    currentFeature = feature;
  };
  
  const onMap = map.on('pointermove', function (evt) {
    if (evt.dragging && info) {
      info.style.visibility = 'hidden';
      currentFeature = undefined;
      return;
    }
    displayFeatureInfo(evt.pixel, evt.originalEvent.target);
  });
  
  map.getTargetElement().addEventListener('pointerleave', function () {
    currentFeature = undefined;
    if (info) {
      info.style.visibility = 'hidden';
    }
  });
  return onMap;
}
