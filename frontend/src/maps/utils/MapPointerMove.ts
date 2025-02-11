import type { Map } from 'ol';
import type { MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { throttle, debounce } from 'lodash';
import type { DebouncedFunc } from 'lodash';

interface ExpeditionProperties {
  type: 'Expedition' | 'country';
  [key: string]: string | number | boolean;
}

interface MapPointerMoveHandlerOptions {
  onHover?: (expedition: ExpeditionProperties | null, pixel: number[]) => void;
  debounceTime?: number;
  throttleTime?: number;
}

// export function addMapPointerMoveHandler(
//   map: Map,
//   options: MapPointerMoveHandlerOptions
// ): () => void {
//   const processFeatures = (pixel: number[]) => {
//     const hit = map.hasFeatureAtPixel(pixel);

//     // Update cursor style
//     const targetElement = map.getTargetElement();
//     if (targetElement) {
//       targetElement.style.cursor = hit ? 'pointer' : '';
//     }

//     const featureHitCallback = (feature: FeatureLike) => {
//       const properties = feature.getProperties() as ExpeditionProperties;
//       if (properties.type === 'Expedition' || properties.type === 'country') {
//         if (options.onHover) {
//           options.onHover(properties, pixel);
//         }
//       }
//     }

//     if (hit) {
//       map.forEachFeatureAtPixel(
//         pixel,
//         featureHitCallback
//       );
//     } else {
//       if (options.onHover) {
//         options.onHover(null, []);
//       }
//     }
//   };

//   // Create throttled version that's then debounced
//   // const throttledProcess = throttle(processFeatures, options.throttleTime ?? 150);
//   // const debouncedThrottledProcess: DebouncedFunc<typeof throttledProcess> = 
//   //   debounce(throttledProcess, options.debounceTime ?? 10);

//   const pointerMoveHandler = (event: MapBrowserEvent<UIEvent>) => {
//     if (!map) return;
//     const pixel = map.getEventPixel(event.originalEvent);
//     // debouncedThrottledProcess(pixel);
//     processFeatures(pixel);
//   };

//   map.on('pointermove', pointerMoveHandler);

//   return () => {
//     map.un('pointermove', pointerMoveHandler);
//     // Cancel any pending debounced/throttled calls
//     // debouncedThrottledProcess.cancel();
//     // throttledProcess.cancel();
//   };
// }
