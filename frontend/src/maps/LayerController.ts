import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { createCountryLayer } from '@/maps/layers/overlay/CountryLayer';
import { createExpeditionLayer } from '@/maps/layers/overlay/ExpeditionLayer';
// ... other imports
import { countryStyle } from '@/maps/styles/layerStyles';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import VectorTileLayer from 'ol/layer/VectorTile';

import {
  createDjiboutiGeomorphicLayer,
  createDjiboutiBenthicLayer,
  createDjiboutiBoundaryLayer,
  createDjiboutiReefExtentLayer
} from '@/maps/layers/overlay/DjiboutiLayer';



export class LayerController {
  private countryLayer: VectorLayer<VectorSource>;
  private expeditionLayer: VectorLayer<VectorSource>;
  // private coastlineLayer: VectorLayer<VectorSource> ;
  private geomorphicLayer: VectorTileLayer<any>;
  private benthicLayer: VectorTileLayer<any>;
  private boundaryLayer: VectorTileLayer<any>;
  private reefExtentLayer: VectorTileLayer<any>;


  constructor() {
    this.countryLayer = createCountryLayer();
    this.expeditionLayer = createExpeditionLayer();
    // this.coastlineLayer = this.countryLayer;
    this.geomorphicLayer = createDjiboutiGeomorphicLayer();
    this.benthicLayer = createDjiboutiBenthicLayer();
    this.boundaryLayer = createDjiboutiBoundaryLayer();
    this.reefExtentLayer = createDjiboutiReefExtentLayer();
  }

  public initDjibouti() {
    this.geomorphicLayer = createDjiboutiGeomorphicLayer();
    this.benthicLayer = createDjiboutiBenthicLayer();
    this.boundaryLayer = createDjiboutiBoundaryLayer();
    this.reefExtentLayer = createDjiboutiReefExtentLayer();
  }

  public showCountryLayer() {
    this.countryLayer.setVisible(true);
  }
  public hideCountryLayer() {
    this.countryLayer.setVisible(false);
  }

  public updateCountryStyle(style: Style) {
    this.countryLayer.setStyle(style);
  }

  public updateExpeditions(expeditionData: any) {
    // at the moment, only Djibouti has expedition data
    this.expeditionLayer.getSource()?.clear();

    if (expeditionData) {
      const expeditionFeatures = new GeoJSON().readFeatures(expeditionData, {
        featureProjection: 'EPSG:4326',
      });
      this.expeditionLayer.getSource()?.addFeatures(expeditionFeatures);
    }
  }

  public resetLayers() {
    // this.coastlineLayer?.getSource()?.clear();
    this.expeditionLayer?.getSource()?.clear();
    this.countryLayer.setStyle(countryStyle); // Reset style to show yellow circles
  }

  public getLayers() {
    return [
      this.countryLayer,
      this.expeditionLayer,
      this.geomorphicLayer,
      this.benthicLayer,
      this.boundaryLayer,
      this.reefExtentLayer];
  }

  public getExpeditonLayer() {
    return this.expeditionLayer;
  }
  public setExpeditionLayer(expeditionLayer: VectorLayer<VectorSource>) {
    this.expeditionLayer = expeditionLayer;
  }
  public getCorrenAllenLayers() {
    return [this.geomorphicLayer, this.benthicLayer, this.boundaryLayer, this.reefExtentLayer];
  }

  public getActiveLayers() {
    return this.getLayers().filter((layer) => layer.getVisible());
  }
}
