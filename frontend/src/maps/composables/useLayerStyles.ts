import { ref, computed } from 'vue';
import { geomorphicColorMap, benthicColorMap } from '@/maps/config/layerColors';
import { Style, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

// Create a singleton state for layer styles
const visibleClasses = ref<{ [key: string]: boolean }>({
  // Initialize Geomorphic classes
  ...Object.fromEntries(Object.keys(geomorphicColorMap).map(key => [key, true])),
  // Initialize Benthic classes
  ...Object.fromEntries(Object.keys(benthicColorMap).map(key => [key, true]))
});

export function useLayerStyles() {
  const setClassVisibility = (className: string, isVisible: boolean) => {
    visibleClasses.value[className] = isVisible;
  };

  const setAllClassesVisibility = (layerType: 'Geomorphic' | 'Benthic', isVisible: boolean) => {
    const colorMap = layerType === 'Geomorphic' ? geomorphicColorMap : benthicColorMap;
    Object.keys(colorMap).forEach(className => {
      visibleClasses.value[className] = isVisible;
    });
  };

  const createGeomorphicStyle = (feature: Feature<Geometry>) => {
    const featureClass = feature.get('class') as string;
    if (!visibleClasses.value[featureClass]) {
      return new Style({});
    }
    return new Style({
      fill: new Fill({
        color: geomorphicColorMap[featureClass] || 'rgba(128, 128, 128, 0.5)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.3)',
        width: 1
      })
    });
  };

  const createBenthicStyle = (feature: Feature<Geometry>) => {
    const featureClass = feature.get('class') as string;
    if (!visibleClasses.value[featureClass]) {
      return new Style({});
    }
    return new Style({
      fill: new Fill({
        color: benthicColorMap[featureClass] || 'rgba(128, 128, 128, 0.5)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.3)',
        width: 1
      })
    });
  };

  return {
    visibleClasses: computed(() => visibleClasses.value),
    setClassVisibility,
    setAllClassesVisibility,
    createGeomorphicStyle,
    createBenthicStyle
  };
}