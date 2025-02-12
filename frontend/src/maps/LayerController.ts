import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createCountryLayer } from '@/maps/layers/overlay/CountryLayer';
import { createExpeditionLayer } from '@/maps/layers/overlay/SamplingSites/ExpeditionLayer';
import { countryStyle } from '@/maps/styles/layerStyles';
import { Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

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
  private geomorphicLayer: VectorTileLayer<VectorTileSource> | null = null;
  private benthicLayer: VectorTileLayer<VectorTileSource> | null = null;
  private boundaryLayer: VectorTileLayer<VectorTileSource> | null = null;
  private reefExtentLayer: VectorTileLayer<VectorTileSource> | null = null;

  constructor() {
    this.countryLayer = createCountryLayer();
    this.expeditionLayer = createExpeditionLayer();
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

  public getGeomorphicLayer() {
    return this.geomorphicLayer;
  }
  
  public getBenthicLayer() {
    return this.benthicLayer;
  }

  public getBoundaryLayer() {
    return this.boundaryLayer;
  }

  public getReefExtentLayer() {
    return this.reefExtentLayer
  }
  public getCountryLayer() {
    return this.countryLayer;
  }
  public setCountryLayer(countryLayer: VectorLayer<VectorSource>) {
    this.countryLayer = countryLayer;
  }

  public getExpeditionLayer(type: 'by project' | 'by year'| 'hard coral cover' = 'by project') {
    if (type === 'by project') {
     return createExpeditionLayer('by project');
    }
    if (type === 'by year') {
      return createExpeditionLayer('by year');
    }
    if (type === 'hard coral cover') {
      return createExpeditionLayer('hard coral cover');
    }
    // return this.expeditionLayer;
  }
  public setExpeditionLayer(expeditionLayer: VectorLayer<VectorSource>) {
    this.expeditionLayer = expeditionLayer;
  }
  public getCorrenAllenLayers() {
    return [this.geomorphicLayer, this.benthicLayer, this.boundaryLayer, this.reefExtentLayer];
  }

  public getActiveLayers() {
    return this.getLayers().filter((layer): layer is NonNullable<typeof layer> => {
      return layer !== null && layer.getVisible();
    });
  }

}
