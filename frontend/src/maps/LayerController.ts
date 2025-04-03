import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createCountryLayer } from '@/maps/layers/overlay/CountryLayer';
import { createExpeditionLayer } from '@/maps/layers/overlay/SamplingSites/ExpeditionLayer';
import { countryStyle } from '@/maps/styles/layerStyles';
import { Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { createEnvironmentalLayers } from './layers/overlay/EnvironmentalLayers/DjiboutiLayer';
// import GeoTIFFSource from 'ol/source/GeoTIFF';
import WebGLTileLayer from 'ol/layer/WebGLTile';

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
  private environmentalLayers: WebGLTileLayer[] | null = null;
  // private CHL_monthlyMeanLayer: WebGLTileLayer<GeoTIFFSource> | null = null;
  // private CHL_monthlyMeanMeanLayer: WebGLTileLayer<GeoTIFFSource> | null = null;
  // private CHL_monthlyMeanSDLayer: WebGLTileLayer<GeoTIFFSource> | null = null;

  constructor() {
    this.countryLayer = createCountryLayer();
    this.expeditionProjectLayer = createExpeditionLayer('by project');
    this.expeditionYearLayer = createExpeditionLayer('by year');
    this.expeditionHardCoralCoverLayer = createExpeditionLayer(
      'hard coral cover',
      { experiment: '3D' }
    );
    this.environmentalLayers = createEnvironmentalLayers();
    // this.CHL_monthlyMeanMeanLayer = env[0];
    // this.CHL_monthlyMeanSDLayer = env[1];
  }

  destroy() {
    this.countryLayer.getSource()?.clear();
    this.expeditionProjectLayer.getSource()?.clear();
    this.expeditionYearLayer.getSource()?.clear();
    this.expeditionHardCoralCoverLayer.getSource()?.clear();
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
      const createFeaturesForLayer = () =>
        new GeoJSON().readFeatures(expeditionData, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        });

      // Add cloned features to each layer
      this.expeditionProjectLayer
        .getSource()
        ?.addFeatures(createFeaturesForLayer());
      this.expeditionYearLayer
        .getSource()
        ?.addFeatures(createFeaturesForLayer());
      this.expeditionHardCoralCoverLayer
        .getSource()
        ?.addFeatures(createFeaturesForLayer());
    }
  }

  public resetLayers() {
    this.countryLayer.setStyle((feature) =>
      countryStyle(feature as Feature<Geometry>)
    ); // Reset style to show yellow circles
  }

  public getLayers() {
    return [
      this.countryLayer,
      this.geomorphicLayer,
      this.benthicLayer,
      this.boundaryLayer,
      this.reefExtentLayer,
    ];
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
    return this.reefExtentLayer;
  }
  public getCountryLayer() {
    return this.countryLayer;
  }
  public setCountryLayer(countryLayer: VectorLayer<VectorSource>) {
    this.countryLayer = countryLayer;
  }

  public getExpeditionLayer(
    type: 'by project' | 'by year' | 'hard coral cover' = 'by project'
  ) {
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
    return [
      this.geomorphicLayer,
      this.benthicLayer,
      this.boundaryLayer,
      this.reefExtentLayer,
    ];
  }

  public getEnvironmentalLayers() {
    return this.environmentalLayers;
  }

  // deprecated for now
  public setEnvironmentalLayer(environmentalLayer: WebGLTileLayer | null) {
    // If environmentalLayers doesn't exist, do nothing
    if (!this.environmentalLayers) return;

    // If null is passed, hide all environmental layers
    if (environmentalLayer === null) {
      this.environmentalLayers.forEach((layer) => layer.setVisible(false));
      return;
    }

    // Find the layer in the array that has the same name as the one passed in
    const layerName = environmentalLayer.get('name');

    if (!layerName) {
      console.warn('Environmental layer has no name property');
      return;
    }

    // Make only the matching layer visible, hide others
    this.environmentalLayers.forEach((layer) => {
      const name = layer.get('name');
      layer.setVisible(name === layerName);
    });
  }
  public getActiveLayers() {
    return this.getLayers().filter(
      (layer): layer is NonNullable<typeof layer> => {
        return layer !== null && layer.getVisible();
      }
    );
  }
}
