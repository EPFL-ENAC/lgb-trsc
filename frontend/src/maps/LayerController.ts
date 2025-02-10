import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createCountryLayer } from '@/maps/layers/overlay/CountryLayer';
import { createExpeditionLayer } from '@/maps/layers/overlay/ExpeditionLayer';
import { countryStyle } from '@/maps/styles/layerStyles';
import { Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {
  createDjiboutiGeomorphicLayer,
  createDjiboutiBenthicLayer,
  createDjiboutiBoundaryLayer,
  createDjiboutiReefExtentLayer
} from '@/maps/layers/overlay/DjiboutiLayer';

interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: {
      type: string;
      coordinates: number[] | number[][] | number[][][];
    };
    properties: Record<string, unknown>;
  }>;
}

export class LayerController {
  private countryLayer: VectorLayer<VectorSource>;
  private expeditionLayer: VectorLayer<VectorSource>;
  // private coastlineLayer: VectorLayer<VectorSource> ;
  private geomorphicLayer: VectorTileLayer<VectorTileSource>;
  private benthicLayer: VectorTileLayer<VectorTileSource>;
  private boundaryLayer: VectorTileLayer<VectorTileSource>;
  private reefExtentLayer: VectorTileLayer<VectorTileSource>;


  constructor() {
    this.countryLayer = createCountryLayer();
    this.expeditionLayer = createExpeditionLayer();
    // this.coastlineLayer = this.countryLayer;
    this.geomorphicLayer = createDjiboutiGeomorphicLayer();
    this.benthicLayer = createDjiboutiBenthicLayer();
    this.boundaryLayer = createDjiboutiBoundaryLayer();
    this.reefExtentLayer = createDjiboutiReefExtentLayer();
  }

  public initDefaultLayers() {
    this.countryLayer = createCountryLayer();
    this.expeditionLayer = createExpeditionLayer();
    // this.coastlineLayer = this.countryLayer
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

  public updateExpeditions(expeditionData: GeoJSONFeatureCollection) {
    // at the moment, only Djibouti has expedition data
    this.expeditionLayer.getSource()?.clear();

    if (expeditionData) {
      const expeditionFeatures = new GeoJSON().readFeatures(expeditionData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
        // was  featureProjection: 'EPSG:4326',
      });
      this.expeditionLayer.getSource()?.addFeatures(expeditionFeatures);
      // we shoudld probably update the map view here when we change the layer.
      
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
