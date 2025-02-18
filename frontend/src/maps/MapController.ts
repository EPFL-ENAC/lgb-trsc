import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import {
  ScaleLine,
  FullScreen,
  ZoomSlider,
  Zoom,
  Attribution,
  Rotate,
} from 'ol/control';
import { createOSMLayer } from './layers/base/OSMLayer';
import { createArcGISLayer } from './layers/base/ArcGISLayer';
import { Feature } from 'ol';
import {
  defaultCenter,
  defaultMinZoom,
  defaultExtent,
  defaultMinZoomCountry,
} from './config';
import {
  addMapClickHandler,
  MapClickHandlerOptions,
} from '@/maps/utils/MapClickHandler';
import { addMapPointerMoveHandler } from '@/maps/utils/MapPointerMove';
import { useMapStore } from '@/stores/mapStore';
import DjiboutiExpeditions from '@/assets/data/Expeditions.json';
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';
import { useLayerController } from '@/maps/composables/useLayerController';
import GeoJSON from 'ol/format/GeoJSON';
import { getCenter } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import {
  createDjiboutiGeomorphicLayer,
  createDjiboutiBenthicLayer,
  createDjiboutiMarineProtectedAreaLayer,
  createDjiboutiBoundaryLayer,
  createDjiboutiReefExtentLayer,
} from '@/maps/layers/overlay/ReefLayers/DjiboutiLayer';
import { createDjiboutiEnvironmentalClusterLayer } from '@/maps/layers/overlay/EnvironmentalClusters/DjiboutiLayer';
import { FeatureLike } from 'ol/Feature';
import { Pixel } from 'ol/pixel';
import Target from 'ol/events/Target';
import {
  createCHL_monthly_mean_1997_2024_MeanLayer,
  createCHL_monthly_mean_1997_2024_SD,
} from './layers/overlay/EnvironmentalLayers/DjiboutiLayer';
import { BaseLayerOptions } from 'ol-layerswitcher';
import { Geometry } from 'ol/geom';

interface CustomBaseLayerOptions extends BaseLayerOptions {
  inputType?: 'base' | 'checkbox' | 'radio';
}

export class MapController {
  private map: Map | null = null;

  constructor(target: string) {
    this.map = new Map({
      target,
      view: new View({
        center: defaultCenter,
        zoom: defaultMinZoom,
        minZoom: defaultMinZoom,
        maxZoom: 17,
        extent: defaultExtent,
      }),
      controls: [
        new ScaleLine(),
        new FullScreen(),
        new ZoomSlider(),
        new Zoom(),
        new Attribution({
          collapsible: false,
        }),
        new Rotate({ autoHide: false, className: 'ol-rotate' }),
      ],
    });
  }
  public destroy() {
    // Remove all controls
    const controls = this.map?.getControls().getArray();
    controls?.forEach(control => this.map?.removeControl(control));

    // // Remove all layers
    if (this.baseMaps) {
      this.map?.removeLayer(this.baseMaps);
    }
    if (this.overlayMaps) {
      this.map?.removeLayer(this.overlayMaps);
    }

    // // Remove all interactions
    const interactions = this.map?.getInteractions().getArray();
    interactions?.forEach(interaction => this.map?.removeInteraction(interaction));

    // Remove all event listeners
    this.map?.setTarget("");
    this.map = null;
  }

  public getMap() {
    return this.map;
  }
  private baseMaps: LayerGroup | null = null;
  private overlayMaps: LayerGroup | null = null;

  public init(): void {
    this.baseMaps = new LayerGroup({
      layers: [createArcGISLayer(), createOSMLayer()],
    });

    const layerController = useLayerController();

    this.overlayMaps = new LayerGroup({
      layers: [
        new LayerGroup({
          title: 'Environmental Layers',
          inputType: 'checkbox',
          layers: [
            createCHL_monthly_mean_1997_2024_MeanLayer(),
            createCHL_monthly_mean_1997_2024_SD(),
          ],
        } as CustomBaseLayerOptions),
        new LayerGroup({
          title: 'Reef Layers',
          inputType: 'checkbox',
          layers: [
            createDjiboutiReefExtentLayer(),
            createDjiboutiGeomorphicLayer(),
            createDjiboutiMarineProtectedAreaLayer(),
            createDjiboutiBenthicLayer(),
            createDjiboutiBoundaryLayer(),
          ],
        } as CustomBaseLayerOptions),
        new LayerGroup({
          title: 'Environmental Clusters',
          layers: [createDjiboutiEnvironmentalClusterLayer()],
        } as CustomBaseLayerOptions),
        new LayerGroup({
          title: 'Sampling sites',
          inputType: 'radio',
          layers: [
            // layerController.getExpeditionLayer('unknown'),
            // option 1: "hard coral cover" (by default), described in [FEATURE] Classify expeditions (the marker) in color by the coral condition #8
            // option 2 : "by year"
            // option 3 :by project
            layerController.getExpeditionLayer('hard coral cover'),
            layerController.getExpeditionLayer('by year'),
            layerController.getExpeditionLayer('by project'),
          ],
        } as CustomBaseLayerOptions),
        layerController.getCountryLayer(),
      ],
    });

    this.map?.addLayer(this.baseMaps);
    this.map?.addLayer(this.overlayMaps);

    // Retrieve the store instance
    const mapStore = useMapStore();

    const { selectCountry, selectExpedition, onHover } = mapStore;

    // Define any extra parameters (raw data, expedition GeoJSON, and a new style)
    const threeDMappingByCountry = {
      /* your raw country data here */
      Djibouti: Djibouti3DMapping,
    };
    const expeditionsByCountry = {
      /* your expedition GeoJSON data here */
      Djibouti: DjiboutiExpeditions,
    };
    const selectedCountryStyle = null; // Replace with an actual style instance if needed

    const clickHandlerOptions: MapClickHandlerOptions = {
      selectCountry,
      selectExpedition,
      threeDMappingByCountry,
      expeditionsByCountry,
      selectedCountryStyle,
    };

    if (this.map) {
       addMapClickHandler(
        this.map,
        clickHandlerOptions
      );
  
      addMapPointerMoveHandler(this.map, {
        onHover,
      });
    }
  }

  // Add new layer management methods
  public setBaseMapVisible(layerIndex: number): void {
    if (!this.baseMaps) return;
    const layers = this.baseMaps.getLayers();
    layers.forEach((layer, index) => {
      layer.setVisible(index === layerIndex);
    });
  }

  public getBaseMaps() {
    return this.baseMaps?.getLayers().getArray() || [];
  }

  public getOverlayMaps() {
    return this.overlayMaps?.getLayers().getArray() || [];
  }

  public setLayerVisibility(
    groupIndex: number,
    layerIndex: number,
    visible: boolean
  ): void {
    if (!this.overlayMaps) return;
    const groups = this.overlayMaps.getLayers();
    const group = groups.item(groupIndex);
    if (group instanceof LayerGroup) {
      const layers = group.getLayers();
      const layer = layers.item(layerIndex);
      if (layer) {
        layer.setVisible(visible);
      }
    }
  }

  public zoomToCountry(): void {

    const mapStore = useMapStore();
    const selectedCountry = mapStore.selectedCountry;
    if (selectedCountry && selectedCountry.coastline) {
      const coastlineFeature = new GeoJSON().readFeature(
        selectedCountry.coastline,
        {
          featureProjection: 'EPSG:4326',
        }
      ) as Feature;

      const extent = coastlineFeature.getGeometry()?.getExtent();
      if (!extent) return;

      const transformedExtent = transformExtent(
        extent,
        'EPSG:4326',
        'EPSG:3857'
      );
      this.map?.getView().fit(transformedExtent, { duration: 300 });
      const currentView = this.map?.getView().getProperties();
      if (currentView) {
        currentView.zoom = defaultMinZoomCountry;
        currentView.minZoom = defaultMinZoomCountry;
        currentView.center = getCenter(transformedExtent);
      }

      this.map?.setView(new View(currentView));
    }
  }

  public zoomOutOfCountry = () => {
    const currentView = this.map?.getView().getProperties();
    if (currentView) {
      currentView.zoom = defaultMinZoom;
      currentView.minZoom = defaultMinZoom;
      currentView.center = getCenter(defaultExtent);
    }
    this.map?.setView(new View(currentView));
    this.map?.getView().animate({ zoom: 3, duration: 300 });
  };

  public refreshMap() {
    this.map?.renderSync();
  }

  public zoomToExpedition = () => {
    const mapStore = useMapStore();
    const selectedExpedition = mapStore.selectedCountry;
    if (selectedExpedition) {
      const extent = (selectedExpedition?.geometry as Geometry).getExtent();
      this.map?.getView().fit(extent, { duration: 300 });
    }
  };
}
