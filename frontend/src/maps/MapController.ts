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
import LayerSwitcher, { BaseLayerOptions } from 'ol-layerswitcher';
import { createOSMLayer } from './layers/base/OSMLayer';
import { createArcGISLayer } from './layers/base/ArcGISLayer';
import { createCountryLayer } from './layers/overlay/CountryLayer';
import { createExpeditionLayer } from './layers/overlay/ExpeditionLayer';
import { createDjiboutiGeomorphicLayer,
        createDjiboutiBenthicLayer,
        createDjiboutiBoundaryLayer,
        createDjiboutiReefExtentLayer
 } from './layers/overlay/DjiboutiLayer';
import { defaultCenter, defaultMinZoom, defaultExtent, defaultMinZoomCountry } from './config';
import {
  addMapClickHandler,
  MapClickHandlerOptions,
} from '@/maps/utils/MapClickHandler';
import {
  addMapPointerMoveHandler,
} from '@/maps/utils/MapPointerMove';
import { useMapStore } from '@/stores/mapStore';
import { expeditions as DjiboutiExpeditions } from '@/assets/data/expeditions';
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';
import { useLayerController } from '@/maps/composables/useLayerController';
import GeoJSON from 'ol/format/GeoJSON';
import { getCenter } from 'ol/extent';
import { transformExtent } from 'ol/proj';

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

  public init(): void {
    const baseMaps = new LayerGroup({
      title: 'Base maps',
      fold: 'close',
      layers: [createArcGISLayer(), createOSMLayer()],
    } as BaseLayerOptions);

    const layerController = useLayerController();


    // find a way to group Coral Allen's layers
    const overlayMaps = new LayerGroup({
      title: 'Overlays',
      fold: 'open',
      layers: Object.values(layerController.getLayers()),
    } as BaseLayerOptions);

    this.map.addLayer(baseMaps);
    this.map.addLayer(overlayMaps);

    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: 'group',
      startActive: true,
      tipLabel: 'Layers',
    });
    this.map.addControl(layerSwitcher);

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

    addMapClickHandler(this.map, clickHandlerOptions);


    const cleanup = addMapPointerMoveHandler(this.map, {
      onHover
    });

    // Store cleanup callback
    this.cleanupCallbacks.push(cleanup);
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
    );
    const extent = coastlineFeature.getGeometry().getExtent();

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

  public destroy(): void {
    this.cleanupCallbacks.forEach((cb) => cb());
    this.cleanupCallbacks = [];
    this.map.setTarget(undefined);
  }
}
