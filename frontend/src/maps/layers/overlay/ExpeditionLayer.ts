import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { BaseLayerOptions } from 'ol-layerswitcher';
import { expeditionStyle } from '@/maps/styles/layerStyles';

const LayerTitle = 'Expedition';

export const createExpeditionLayer = () =>
  new VectorLayer({
    source: new VectorSource({}),
    title: LayerTitle,
    visible: true,
    style: expeditionStyle,
  } as BaseLayerOptions);
