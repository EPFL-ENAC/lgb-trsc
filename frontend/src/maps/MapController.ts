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
import { createDjiboutiGeomorphicLayer } from './layers/overlay/DjiboutiGeomorphicLayer';
import { defaultCenter, defaultMinZoom, defaultExtent } from './config';
import {
  addMapClickHandler,
  MapClickHandlerOptions,
} from '@/maps/utils/MapClickHandler';
import {
  addMapPointerMoveHandler,
  MapPointerMoveHandlerOptions,
} from '@/maps/utils/MapPointerMove';
import { useMapStore } from '@/stores/mapStore';
import { expeditions as DjiboutiExpeditions } from '@/assets/data/expeditions';

export class MapController {
  private map: Map;
  public countryLayer: any;
  public expeditionLayer: any;
  public coastlineLayer: any;
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

    // Create overlay layers
    this.countryLayer = createCountryLayer();
    this.expeditionLayer = createExpeditionLayer();
    const djiboutiLayer = createDjiboutiGeomorphicLayer();
    // For this example, assume coastlineLayer is a part of the country layer
    this.coastlineLayer = this.countryLayer;

    const overlayMaps = new LayerGroup({
      title: 'Overlays',
      fold: 'open',
      layers: [this.countryLayer, this.expeditionLayer, djiboutiLayer],
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

    const { selectCountry, selectExpedition, zoomToCountry, zoomToExpedition, onHover } =
      mapStore;

    // Define any extra parameters (raw data, expedition GeoJSON, and a new style)
    const rawData = {
      /* your raw country data here */
    };
    const expeditionsByCountry = {
      /* your expedition GeoJSON data here */
      Djibouti: DjiboutiExpeditions,
    };
    const selectedCountryStyle = null; // Replace with an actual style instance if needed

    const clickHandlerOptions: MapClickHandlerOptions = {
      countryLayer: this.countryLayer,
      expeditionLayer: this.expeditionLayer,
      coastlineLayer: this.coastlineLayer,
      selectCountry,
      selectExpedition,
      rawData,
      expeditionsByCountry,
      selectedCountryStyle,
      zoomToCountry,
      zoomToExpedition,
    };

    addMapClickHandler(this.map, clickHandlerOptions);


    const cleanup = addMapPointerMoveHandler(this.map, {
      onHover
    });

    // Store cleanup callback
    this.cleanupCallbacks.push(cleanup);
  }

  public destroy(): void {
    this.cleanupCallbacks.forEach((cb) => cb());
    this.cleanupCallbacks = [];
    this.map.setTarget(undefined);
  }
}
