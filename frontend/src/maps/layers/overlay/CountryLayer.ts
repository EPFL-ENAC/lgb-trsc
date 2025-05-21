import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { BaseLayerOptions } from 'ol-layerswitcher';
import GeoJSON from 'ol/format/GeoJSON';
import { countryStyle } from 'maps/styles/layerStyles';

import countries from 'assets/data/countries';

const LayerTitle = 'Countries';

export const createCountryLayer = () =>
  new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(countries, {
        featureProjection: 'EPSG:3857',
      }),
    }),
    title: LayerTitle,
    visible: true,
    showInLayerSwitcher: false,
    style: countryStyle,
  } as BaseLayerOptions);
