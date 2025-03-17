import type { Map } from 'ol';
import type { Pixel } from 'ol/pixel';
import { FeatureLike } from 'ol/Feature';

const updateCursorStyle = (map: Map, feature: FeatureLike | undefined) => {
  const mapElement = map.getTargetElement();
  if (mapElement) {
    mapElement.style.cursor = feature ? 'pointer' : 'default';
  }
};

export function addMapPointerMoveHandler(map: Map) {
  const info = document.getElementById('info');

  let currentFeature: FeatureLike | undefined;
  const displayFeatureInfo = (pixel: Pixel, target: unknown) => {
    const feature: FeatureLike | undefined =
      target instanceof HTMLElement && target.closest('.ol-control')
        ? undefined
        : map.getFeaturesAtPixel(pixel, {
            hitTolerance: 10,
            layerFilter: (layer) => {
              const validTooltipLayers = [
                'Countries',
                'Expedition',
                'by year',
                'by project',
                'hard coral cover',
              ];
              // Only check specific layers you're interested in
              // return layer.get('title') === 'Countries' || layer.get('title') === 'Expedition';
              return validTooltipLayers.includes(layer.get('title'));
            },
          })[0];

    updateCursorStyle(map, feature);

    if (info) {
      if (feature) {
        info.style.left = pixel[0] + 'px';
        info.style.top = pixel[1] + 'px';
        const text = feature.get('name') || feature.get('event_id');
        if (feature !== currentFeature && text) {
          info.style.visibility = 'visible';
          info.innerText = feature.get('name') || feature.get('event_id');
          let ongoingProjects = '';
          if (feature.get('type') === 'country') {
            if (text === 'Djibouti') {
              ongoingProjects = `
            Ongoing projects: 3D, SG, MP, eDNA, Sym, echi`;
            }
            info.innerText = feature.get('name') + ongoingProjects;
          }
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
