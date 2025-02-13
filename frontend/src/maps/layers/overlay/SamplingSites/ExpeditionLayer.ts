import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { BaseLayerOptions } from 'ol-layerswitcher';
import { expeditionStyle } from '@/maps/styles/layerStyles';
import { createFeatureStyle } from '@/maps/composables/useLayerStyles';
// import GeoJSON from 'ol/format/GeoJSON';

// const LayerTitle = 'Expedition';
// import DjiboutiExpeditions from '@/assets/data/Expeditions.json';
import { 
  samplingSiteByYearColorMap,
  samplingSiteByProjectColorMap,
  samplingSiteByHardCoralCoverColorMap
} from '@/maps/config/layerColors';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
// or we could just use the json file as is and create a new class for each line.
// we should probably add that directly to the geojson file at build time
// 0 - 10%: red
// 10 - 30%: orange
// 30 - 50%: yellow
// 50 - 75%: light green
// 75 - 100%: bright green

// experiment class is 3D | MP | Sym
// year is 2022 or 2023 and the correspding style color is used

export type ExpeditionStyleType = 'by project' | 'by year' | 'hard coral cover';

export const expeditionStyleTypeMap: Record<ExpeditionStyleType,Record<string, string>>  = {
  'by project': samplingSiteByProjectColorMap.colorMap,
  'by year':  samplingSiteByYearColorMap.colorMap,
  'hard coral cover': samplingSiteByHardCoralCoverColorMap.colorMap,
}

export const propertyFeatureNameMap: Record<ExpeditionStyleType, string> = {
  'by project': 'experiment',
  'by year': 'year',
  'hard coral cover': 'hard_coral_cover',
}

const expeditionSource = new VectorSource({});

export const createExpeditionLayer = (expeditionType: 'by project' | 'by year'| 'hard coral cover' = 'by project') =>
  {
    // const source = new VectorSource({});
    const createReefExtentStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, expeditionStyleTypeMap[expeditionType], false, propertyFeatureNameMap[expeditionType]);
    return  new VectorLayer({
      source: expeditionSource,
      title: `${expeditionType}`,
      visible: true,
      style: createReefExtentStyle,
      // style: expeditionStyle,
    } as BaseLayerOptions);
  }

