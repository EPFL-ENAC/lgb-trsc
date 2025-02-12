import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { BaseLayerOptions } from 'ol-layerswitcher';
// import { expeditionStyle } from '@/maps/styles/layerStyles';
import { createFeatureStyle } from '@/maps/composables/useLayerStyles';
import GeoJSON from 'ol/format/GeoJSON';
// const LayerTitle = 'Expedition';
import DjiboutiExpeditions from '@/assets/data/Expeditions.json';
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


export const expeditionStyleTypeMap = {
  'by project': samplingSiteByYearColorMap,
  'by year': samplingSiteByProjectColorMap,
  'hard coral cover': samplingSiteByHardCoralCoverColorMap,
}

export const createExpeditionLayer = (type: 'by project' | 'by year'| 'hard coral cover' = 'by project') =>

  {
    const source = new VectorSource();
    if (DjiboutiExpeditions) {
      const expeditionFeatures = new GeoJSON().readFeatures(DjiboutiExpeditions, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
        // was  featureProjection: 'EPSG:4326',
      });
      // DjiboutiExpeditions.getSource()?.addFeatures(expeditionFeatures);
      // we shoudld probably update the map view here when we change the layer.
      source.addFeatures(expeditionFeatures);
    }



    return  new VectorLayer({
      source,
      title: `${type}`,
      visible: true,
      style: (feature: Feature<Geometry>) => {
        return createFeatureStyle(feature, expeditionStyleTypeMap[type])
      }
      ,
    } as BaseLayerOptions);
  }

