import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import {
  ScaleLine,
  FullScreen,
  ZoomSlider,
  Zoom,
  Attribution,
  OverviewMap,
} from 'ol/control';
import { createOSMLayer } from './layers/base/OSMLayer';
import { createArcGISLayer } from './layers/base/ArcGISLayer';
import { Feature } from 'ol';
import {
  defaultCenter,
  defaultMinZoom,
  defaultMaxZoom,
  defaultExtent,
  defaultZoomCountry,
  defaultMinZoomCountry,
  defaultMaxZoomCountry,
  defaultMinZoomExpedition,
  defaultMaxZoomExpedition,
  defaultZoomExpedition,
} from './config';
import {
  addMapClickHandler,
  MapClickHandlerOptions,
} from '@/maps/utils/MapClickHandler';
import Point from 'ol/geom/Point';
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
import { createEnvironmentalLayers } from './layers/overlay/EnvironmentalLayers/DjiboutiLayer';
import { BaseLayerOptions } from 'ol-layerswitcher';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export interface CustomBaseLayerOptions extends BaseLayerOptions {
  inputType?: 'base' | 'checkbox' | 'radio';
  showForcountryOnly?: boolean;
}

function createOverviewMap() {
  // Create base layers for overview map
  const overviewMapLayer = new TileLayer({
    source: new OSM(),
  });

  return new OverviewMap({
    className: 'ol-overviewmap red-sea-overview',
    layers: [overviewMapLayer],
    collapsed: false,
    tipLabel: 'Red Sea Overview',
  });
}

export class MapController {
  private map: Map | null = null;
  private overviewMapControl: OverviewMap | null = null;

  constructor(target: string) {
    // Create OverviewMap control
    this.overviewMapControl = createOverviewMap();
    this.map = new Map({
      target,
      view: new View({
        center: defaultCenter,
        zoom: defaultMinZoom,
        minZoom: defaultMinZoom,
        maxZoom: defaultMaxZoom,
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
        this.overviewMapControl,
      ],
    });
  }

  public destroy() {
    // Remove all controls
    const controls = this.map?.getControls().getArray();
    controls?.forEach((control) => this.map?.removeControl(control));

    // // Remove all layers
    if (this.baseMaps) {
      this.map?.removeLayer(this.baseMaps);
    }
    if (this.overlayMaps) {
      this.map?.removeLayer(this.overlayMaps);
    }

    // // Remove all interactions
    const interactions = this.map?.getInteractions().getArray();
    interactions?.forEach((interaction) =>
      this.map?.removeInteraction(interaction)
    );

    // Clear references to controls
    this.overviewMapControl = null;

    // Remove all event listeners
    this.map?.setTarget('');
    this.map = null;
  }

  public getMap() {
    return this.map;
  }
  private baseMaps: LayerGroup | null = null;
  private overlayMaps: LayerGroup | null = null;

  // Toggle overview map visibility based on country selection
  public toggleOverviewMap(visible: boolean): void {
    if (!this.overviewMapControl || !this.map) return;

    const overviewMap = this.overviewMapControl.getOverviewMap();
    const element = overviewMap.getTargetElement();
    if (element && element.parentElement) {
      element.parentElement.style.display = visible ? 'block' : 'none';
      element.style.display = visible ? 'block' : 'none';
    }
  }

  public init(): void {
    this.baseMaps = new LayerGroup({
      layers: [createArcGISLayer(), createOSMLayer()],
    });

    const layerController = useLayerController();

    this.overlayMaps = new LayerGroup({
      layers: [
        new LayerGroup({
          title: 'Environmental Layers',
          visible: true,
          showForcountryOnly: false,
          inputType: 'radio',
          layers: createEnvironmentalLayers(),
        } as CustomBaseLayerOptions),
        new LayerGroup({
          title: 'Reef Layers',
          visible: false,
          showForcountryOnly: true,
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
          visible: false,
          showForcountryOnly: true,
          layers: [createDjiboutiEnvironmentalClusterLayer()],
        } as CustomBaseLayerOptions),
        new LayerGroup({
          title: 'Sampling sites',
          inputType: 'radio',
          visible: false,
          showForcountryOnly: true,
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

    // Initialize overview map to be visible only in Red Sea scope
    this.toggleOverviewMap(true);

    // Retrieve the store instance
    const mapStore = useMapStore();

    const { selectCountry, selectExpedition } = mapStore;

    // should be moved to the store
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
      addMapClickHandler(this.map, clickHandlerOptions);

      addMapPointerMoveHandler(this.map);
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

  public getCountryExtent = () => {
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
      if (extent) {
        const transformedExtent = transformExtent(
          extent,
          'EPSG:4326',
          'EPSG:3857'
        );
        return transformedExtent;
      }
    }
    return null;
  };

  public zoomToCountry(properties: any): void {
    const mapStore = useMapStore();
    mapStore.selectCountry(properties);

    const extent = this.getCountryExtent();
    if (extent) {
      const layerGroups = this.overlayMaps?.getLayers();
      layerGroups?.forEach((layerGroup) => {
        if (layerGroup.get('showForcountryOnly')) {
          layerGroup.set('visible', true);
        }
      });
      const currentView = this.map?.getView().getProperties();
      if (currentView) {
        currentView.zoom = defaultZoomCountry;
        currentView.minZoom = defaultMinZoomCountry;
        currentView.maxZoom = defaultMaxZoomCountry;
        currentView.center = getCenter(extent);
        currentView.extent = extent;
      }

      // Hide overview map in country scope
      this.toggleOverviewMap(false);

      this.map?.getAllLayers().forEach((layer) => {
        const title = layer.get('title');
        if (title === 'by year') {
          layer.setVisible(true);
        }
      });

      this.map?.setView(new View(currentView));
      this.map?.getView().fit(extent, { duration: 300 });
      this.map
        ?.getView()
        .animate({ zoom: defaultMinZoomCountry, duration: 300 });
    }
  }

  public zoomOutOfCountry = () => {
    const layerGroups = this.overlayMaps?.getLayers();
    layerGroups?.forEach((layerGroup) => {
      if (layerGroup.get('showForcountryOnly')) {
        layerGroup.set('visible', false);
      }
    });
    const currentView = this.map?.getView().getProperties();
    if (currentView) {
      currentView.zoom = defaultMinZoom;
      currentView.minZoom = defaultMinZoom;
      currentView.extent = defaultExtent;
      currentView.center = defaultCenter;
      currentView.maxZoom = defaultMaxZoom;
    }

    // Show overview map in Red Sea scope
    this.toggleOverviewMap(true);

    // visible: expeditionType === 'by year',
    this.map?.getAllLayers().forEach((layer) => {
      if (!['ArcGIS', 'OSM', 'Countries'].includes(layer.get('title'))) {
        layer.setVisible(false);
      }
    });

    this.map?.setView(new View(currentView));
    this.map?.getView().animate({ zoom: defaultMinZoom, duration: 300 });
  };

  public refreshMap() {
    this.map?.renderSync();
  }

  public zoomToExpedition = (properties: any) => {
    const mapStore = useMapStore();
    mapStore.selectExpedition(properties);
    const selectedExpedition = mapStore.selectedExpedition;
    if (selectedExpedition && selectedExpedition.geometry) {
      const expeditionFeature = new Feature({
        geometry: new Point([
          selectedExpedition.longitude_start,
          selectedExpedition.latitude_start,
        ]).transform('EPSG:4326', 'EPSG:3857'),
      });

      // in case of transect
      const transformedExtent = expeditionFeature?.getGeometry()?.getExtent();

      const currentView = this.map?.getView().getProperties();
      if (currentView) {
        currentView.zoom = defaultZoomExpedition;
        currentView.minZoom = defaultMinZoomExpedition;
        currentView.maxZoom = defaultMaxZoomExpedition;
        currentView.center = transformedExtent
          ? getCenter(transformedExtent)
          : defaultCenter;
      }
      this.map?.setView(new View(currentView));
      this.map?.getView().animate({
        zoom: 14,
        duration: 300,
        center: transformedExtent
          ? getCenter(transformedExtent)
          : defaultCenter,
      });
    }
  };
}
