import type { Map } from 'ol';

interface MapPointerMoveHandlerOptions {
  onHover?: (expedition: any, pixel: number[]) => void;
}

interface ExpeditionProperties {
  type: string;
  [key: string]: any;
}

export function addMapPointerMoveHandler(
  map: Map,
  options: MapPointerMoveHandlerOptions
): () => void {
  const pointerMoveHandler = (event: any) => {
    if (!map) return;

    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);

    // Update cursor style
    const targetElement = map.getTargetElement();
    if (targetElement) {
      targetElement.style.cursor = hit ? 'pointer' : '';
    }

    if (hit) {
      map.forEachFeatureAtPixel(pixel, function (feature) {
        const properties = feature.getProperties() as ExpeditionProperties;
        if (properties.type === 'Expedition') {
          if (options.onHover) {
            options.onHover(properties, pixel);
          }
        }
      });
    } else {
      if (options.onHover) {
        options.onHover(null, []);
      }
    }
  };

  map.on('pointermove', pointerMoveHandler);

  return () => {
    map.un('pointermove', pointerMoveHandler);
  };
}

// OLD CODE
// map.on('pointermove', (event) => {
//   const pixel = map.getEventPixel(event.originalEvent);
//   const hit = map.hasFeatureAtPixel(pixel);
//   map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//   if (hit) {
//     map.forEachFeatureAtPixel(pixel, function (feature) {
//       const properties = feature.getProperties();
//       if (properties.type === 'Expedition') {
//         hoveredExpedition.value = properties;
//         hoveredExpeditionPixel.value = pixel;
//       }
//     });
//   } else {
//     hoveredExpedition.value = null;
//     hoveredExpeditionPixel.value = null;
//   }
// });
