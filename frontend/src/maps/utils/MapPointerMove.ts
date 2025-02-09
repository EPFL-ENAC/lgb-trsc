import type { Feature, Map } from 'ol';
import type { MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';

interface ExpeditionProperties {
  type: 'Expedition' | 'country';
  [key: string]: string | number | boolean;
}

interface MapPointerMoveHandlerOptions {
  onHover?: (expedition: ExpeditionProperties | null, pixel: number[]) => void;
  debounceTime?: number;
  throttleTime?: number;
}

function debounce<T extends (pixel: number[]) => void>(
  func: T,
  wait: number
): (pixel: number[]) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (pixel: number[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(pixel);
      timeoutId = undefined;
    }, wait);
  };
}

function throttle<T extends (pixel: number[]) => void>(
  func: T,
  limit: number
): (pixel: number[]) => void {
  let inThrottle = false;
  let lastPixel: number[] | null = null;

  return (pixel: number[]) => {
    if (!inThrottle) {
      func(pixel);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastPixel) {
          func(lastPixel);
          lastPixel = null;
        }
      }, limit);
    } else {
      lastPixel = pixel;
    }
  };
}

export function addMapPointerMoveHandler(
  map: Map,
  options: MapPointerMoveHandlerOptions
): () => void {
  const processFeatures = (pixel: number[]) => {
    const hit = map.hasFeatureAtPixel(pixel);

    // Update cursor style
    const targetElement = map.getTargetElement();
    if (targetElement) {
      targetElement.style.cursor = hit ? 'pointer' : '';
    }

    const featureHitCallback = (feature: FeatureLike) => {
      const properties = feature.getProperties() as ExpeditionProperties;
      if (properties.type === 'Expedition' || properties.type === 'country') {
        if (options.onHover) {
          options.onHover(properties, pixel);
        }
      }
    }

    if (hit) {
      map.forEachFeatureAtPixel(
        pixel,
        featureHitCallback
      );
    } else {
      if (options.onHover) {
        options.onHover(null, []);
      }
    }
  };

  // Create throttled version that's then debounced
  const throttledProcess = throttle(processFeatures, options.throttleTime ?? 150);
  const debouncedThrottledProcess = debounce(throttledProcess, options.debounceTime ?? 10);

  const pointerMoveHandler = (event: MapBrowserEvent<UIEvent>) => {
    if (!map) return;
    const pixel = map.getEventPixel(event.originalEvent);
    debouncedThrottledProcess(pixel);
  };

  map.on('pointermove', pointerMoveHandler);

  return () => {
    map.un('pointermove', pointerMoveHandler);
  };
}
