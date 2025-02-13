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
  private geomorphicLayer: VectorTileLayer<VectorTileSource> | null = null;
  private benthicLayer: VectorTileLayer<VectorTileSource> | null = null;
  private boundaryLayer: VectorTileLayer<VectorTileSource> | null = null;
  private reefExtentLayer: VectorTileLayer<VectorTileSource> | null = null;
  private expeditionProjectLayer: VectorLayer<VectorSource>;
  private expeditionYearLayer: VectorLayer<VectorSource>;
  private expeditionHardCoralCoverLayer: VectorLayer<VectorSource>;

  constructor() {
    this.countryLayer = createCountryLayer();
    this.expeditionProjectLayer = createExpeditionLayer('by project');
    this.expeditionYearLayer = createExpeditionLayer('by year');
    this.expeditionHardCoralCoverLayer = createExpeditionLayer('hard coral cover');
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
    this.expeditionProjectLayer.getSource()?.clear();
    this.expeditionYearLayer.getSource()?.clear();
    this.expeditionHardCoralCoverLayer.getSource()?.clear();

    if (expeditionData) {
      // Create features for each layer separately
      const createFeaturesForLayer = () => new GeoJSON().readFeatures(expeditionData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });

      // Add cloned features to each layer
      this.expeditionProjectLayer.getSource()?.addFeatures(createFeaturesForLayer());
      this.expeditionYearLayer.getSource()?.addFeatures(createFeaturesForLayer());
      this.expeditionHardCoralCoverLayer.getSource()?.addFeatures(createFeaturesForLayer());
    }
  }

  public resetLayers() {
    // this.coastlineLayer?.getSource()?.clear();
    this.countryLayer.setStyle(countryStyle); // Reset style to show yellow circles
  }

  public getLayers() {
    return [
      this.countryLayer,
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
      return this.expeditionProjectLayer;
    }
    if (type === 'by year') {
      return this.expeditionYearLayer;
    }
    if (type === 'hard coral cover') {
      return this.expeditionHardCoralCoverLayer;
    }
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
