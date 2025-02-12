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
import { defaultCenter, defaultMinZoom, defaultExtent, defaultMinZoomCountry } from './config';
import {
  addMapClickHandler,
  MapClickHandlerOptions,
} from '@/maps/utils/MapClickHandler';
import {
  addMapPointerMoveHandler,
} from '@/maps/utils/MapPointerMove';
import { useMapStore } from '@/stores/mapStore';
// import { expeditions as DjiboutiExpeditions } from '@/assets/data/expeditions';
import DjiboutiExpeditions from '@/assets/data/Expeditions.json';
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';
import { useLayerController } from '@/maps/composables/useLayerController';
import GeoJSON from 'ol/format/GeoJSON';
import { getCenter } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import {
  createDjiboutiGeomorphicLayer,
  createDjiboutiBenthicLayer,
  createDjiboutiBoundaryLayer,
  createDjiboutiReefExtentLayer
} from '@/maps/layers/overlay/ReefLayers/DjiboutiLayer';
import { FeatureLike } from 'ol/Feature';
import { Pixel } from 'ol/pixel';
import Target from 'ol/events/Target';
import { createCHL_monthly_mean_1997_2024_MeanLayer } from './layers/overlay/EnvironmentalLayers/DjiboutiLayer';
import LayerSwitcher, { BaseLayerOptions } from 'ol-layerswitcher';

export class MapController {
  private map: Map;
  private cleanupCallbacks: (() => void)[] = [];

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
        new Attribution(),
        new Rotate({ autoHide: false, className: 'ol-rotate' }),
      ],
    });
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
          layers: [
            createCHL_monthly_mean_1997_2024_MeanLayer(),
          ],
        } as BaseLayerOptions),
        new LayerGroup({
          title: 'Reef Layers',
          layers: [createDjiboutiGeomorphicLayer(), createDjiboutiBenthicLayer(), createDjiboutiBoundaryLayer(), createDjiboutiReefExtentLayer()],
        } as BaseLayerOptions),
        new LayerGroup({
          title: 'Environmental Clusters',
          layers: [],
        } as BaseLayerOptions),
        new LayerGroup({
          title: 'Sampling sites',
          layers: [layerController.getExpeditionLayer(),],
        } as BaseLayerOptions),
        layerController.getCountryLayer(),
        
      ],
    });

    this.map.addLayer(this.baseMaps);
    this.map.addLayer(this.overlayMaps);

    // Retrieve the store instance
    const mapStore = useMapStore();

    const { selectCountry, selectExpedition, onHover } =
      mapStore;

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
      selectedCountryStyle
    };

    const cleanUpClickHandler = addMapClickHandler(this.map, clickHandlerOptions);
    // this.cleanupCallbacks.push(cleanUpClickHandler);

    const cleanup = addMapPointerMoveHandler(this.map, {
      onHover
    });

    // Store cleanup callback
    // this.cleanupCallbacks.push(cleanup);
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

  public setLayerVisibility(groupIndex: number, layerIndex: number, visible: boolean): void {
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
     /*
  This function zoomToCountry is a map navigation function that appears to be using OpenLayers (a JavaScript mapping library). Here's what it does step by step:

    Check for Selected Country:

    First checks if there's a selected country and if it has coastline data
    Create Geographic Feature:

    Creates a GeoJSON feature from the country's coastline data
    Uses the EPSG:4326 projection (standard latitude/longitude coordinate system)
    Get Map Extent:

    Calculates the geographical bounds (extent) of the coastline feature
    An extent is an array of coordinates representing [minX, minY, maxX, maxY]
    Initial Fit:

    Fits the map view to the calculated extent with a 300ms animation duration
    Configure View Settings:

    Gets current view properties
    Sets minimum zoom level (defaultMinZoomCountry)
    Centers the view on the extent's center point
    View Update:

    Creates and sets a new view with the updated properties
    There's also some commented-out code that would add a 2-degree buffer around the extent, presumably to show some surrounding area around the country.

    A key thing to note is that this function is using Vue.js's reactivity system (indicated by selectedCountry.value), suggesting it's part of a Vue component or composable.

    The function essentially zooms and centers the map to focus on a selected country's coastline with some predefined zoom constraints.
  */

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
    this.map.getView().fit(transformedExtent, { duration: 300 });
    const currentView = this.map.getView().getProperties();
    currentView.zoom = defaultMinZoomCountry;
    currentView.minZoom = defaultMinZoomCountry;
    currentView.center = getCenter(transformedExtent);
    // make the following extent bigger to show the whole country
    // Add a buffer of 2 degrees around the extent
    // const buffer = 2;
    // currentView.extent = [
    //   transformedExtent[0] - buffer,
    //   transformedExtent[1] - buffer,
    //   transformedExtent[2] + buffer,
    //   transformedExtent[3] + buffer
    // ];

    this.map.setView(new View(currentView));
  }
  }

  public zoomOutOfCountry = () => {
    const currentView = this.map.getView().getProperties();
    currentView.zoom = defaultMinZoom;
    currentView.minZoom = defaultMinZoom;
    currentView.center = getCenter(defaultExtent);
    // currentView.extent = defaultExtent;
    this.map.setView(new View(currentView));
    this.map.getView().animate({ zoom: 3, duration: 300 });
  };
  

  public zoomToExpedition = () => {
    const mapStore = useMapStore();
    const selectedExpedition = mapStore.selectedCountry;
    if (selectedExpedition) {
      const extent = selectedExpedition.geometry.getExtent();
      this.map.getView().fit(extent, { duration: 300 });
    }
  };

  public destroy(): void {
    this.cleanupCallbacks.forEach((cb) => cb());
    this.cleanupCallbacks = [];
    this.map.setTarget(undefined);
  }
}
