<template>
  <div
    id="map"
    class="map"
    :style="{ '--drawer-width': drawer ? '500px' : '0px' }"
  ></div>
  <div class="legend" v-if="selectedCountry || selectedExpedition">
    <ul>
      <li>
        Legend:
        <ol>
          <li>
            <span class="legend-color" style="background-color: blue"></span
            >Expedition 2023
          </li>
        </ol>
      </li>
    </ul>
  </div>
  <div class="legend" v-else>
    <ul>
      <li>
        Legend:
        <ol>
          <li>
            <span class="legend-color" style="background-color: yellow"></span
            >Countries
          </li>
        </ol>
      </li>
    </ul>
  </div>
  <!-- // TODO: use popup layer instead of custom-tooltip below -->
  <div
    class="custom-tooltip"
    :style="{
      '--display-tooltip': hoveredExpedition?.Event_ID
        ? 'inline-block'
        : 'none',
      '--left-tooltip': `${hoveredExpeditionPixel?.[0]}px`,
      '--top-tooltip': `${hoveredExpeditionPixel?.[1]}px`,
    }"
  >
    {{ hoveredExpedition?.Event_ID }}
  </div>

  <q-drawer
    side="right"
    v-model="drawer"
    :width="500"
    :breakpoint="500"
    overlay
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    style="
      height: -webkit-fill-available;
      height: -moz-available;
      height: fill-available;
      height: initial;
    "
  >
    <CountryMapPopup
      v-if="selectedCountry && !selectedExpedition"
    />
    <ExpeditionMapPopup
      v-if="selectedExpedition"
    />
  </q-drawer>
</template>

<script setup lang="ts">
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { Map, View } from 'ol';

import {
  Attribution,
  FullScreen,
  Rotate,
  ScaleLine,
  Zoom,
  ZoomSlider,
} from 'ol/control';

import { PMTilesVectorSource } from 'ol-pmtiles';

import { getCenter } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import LayerGroup from 'ol/layer/Group';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { onMounted, ref } from 'vue';
import { QDrawer } from 'quasar';
import CountryMapPopup from 'components/CountryMapPopup.vue';
import ExpeditionMapPopup from 'components/ExpeditionMapPopup.vue';
import { countries } from 'assets/data/countries';
import { expeditions } from 'assets/data/expeditions';
import rawData from 'assets/data/dji_3d_mapping_all_results.json';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import PinchZoom from 'ol/interaction/PinchZoom';
import VectorTileLayer from 'ol/layer/VectorTile';

import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

const selectedCountry = ref(null);
const selectedExpedition = ref(null);
const hoveredExpedition = ref(null);
const hoveredExpeditionPixel = ref(null);
const coastlineLayer = ref<VectorLayer<VectorSource> | null>(null);
const expeditionsLayer = ref<VectorLayer<VectorSource> | null>(null);
const countryLayer = ref<VectorLayer<VectorSource> | null>(null); // Define countryLayer
// const pmTilesLayer = ref<VectorLayer<VectorSource> | null>(null); // Define countryLayer

const drawer = ref(false);
let map: Map;
// red sea extent
const defaultExtent = [15, 2, 60, 32]; // Set extent to block navigation outside the specified coordinates];
const defaultMinZoom = 3;
const defaultCenter = [39.0, 21.5];
const defaultMinZoomCountry = 3; //9;
const defaultMinZoomExpedition = 3; //12;

const closeDrawer = () => {
  drawer.value = false;
  selectedCountry.value = null;
  selectedExpedition.value = null;
  coastlineLayer.value.getSource().clear();
  expeditionsLayer.value.getSource().clear();
  countryLayer.value.setStyle(countryStyle); // Reset style to show yellow circles
  zoomOutOfCountry();
};

const closeExpedition = () => {
  selectedExpedition.value = null;
  zoomToCountry();
};

const zoomToCountry = () => {
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
  if (selectedCountry.value && selectedCountry.value.coastline) {
    const coastlineFeature = new GeoJSON().readFeature(
      selectedCountry.value.coastline,
      {
        featureProjection: 'EPSG:4326',
      }
    );
    const extent = coastlineFeature.getGeometry().getExtent();
    map.getView().fit(extent, { duration: 300 });
    const currentView = map.getView().getProperties();
    currentView.zoom = defaultMinZoomCountry;
    currentView.minZoom = defaultMinZoomCountry;
    currentView.center = getCenter(extent);
    // make the following extent bigger to show the whole country
    // Add a buffer of 2 degrees around the extent
    // const buffer = 2;
    // currentView.extent = [
    //   extent[0] - buffer,
    //   extent[1] - buffer,
    //   extent[2] + buffer,
    //   extent[3] + buffer
    // ];
    map.setView(new View(currentView));
  }
};

const zoomOutOfCountry = () => {
  const currentView = map.getView().getProperties();
  currentView.zoom = defaultMinZoom;
  currentView.minZoom = defaultMinZoom;
  currentView.center = getCenter(defaultExtent);
  // currentView.extent = defaultExtent;
  map.setView(new View(currentView));
  map.getView().animate({ zoom: 3, duration: 300 });
};

const zoomToExpedition = () => {
  if (selectedExpedition.value) {
    // const extent = selectedExpedition.value.geometry.getExtent();
    // map.getView().fit(extent, { duration: 300 });
  }
};

const countryStyle = new Style({
  image: new CircleStyle({
    radius: 10,
    fill: new Fill({
      color: 'yellow',
    }),
  }),
});

const selectedCountryStyle = new Style({
  image: new CircleStyle({
    radius: 0, // Hide yellow circle
    fill: new Fill({
      color: 'transparent',
    }),
  }),
});

onMounted(() => {
  const overlayMaps = new LayerGroup({
    title: 'Overlays',
    fold: 'open',
    layers: [countryLayer.value, pmTilesLayer],
  } as GroupLayerOptions);

  map = new Map({
    target: 'map',
    pixelRatio: 2, // Enable HiDPI support
    layers: [baseMaps, overlayMaps],
    view: new View({
      center: defaultCenter, // Coordinates for the Red Sea
      zoom: defaultMinZoom,
      minZoom: defaultMinZoom, // Set minimum zoom level
      maxZoom: 17, // Set maximum zoom level
      // extent: defaultExtent // Set extent to block navigation outside the specified coordinates
    }),
    controls: [
      new ScaleLine(), // Add scale line control
      new FullScreen(),
      new ZoomSlider(),
      // new Rotate(),
      new Attribution(),
      // new MousePosition(),
      // new OverviewMap(),
      new Zoom(),
      // new LayerSwitcher({
      //   tipLabel: 'Legend', // Optional label for button
      //   groupSelectStyle: 'group' // Optional, use 'children' or 'none' for different selection styles
      // }),
      new Rotate({
        autoHide: false,
        // set proper label
        className: 'ol-rotate',
      }),
    ],
  });

  const layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group',
    startActive: true, // Make the control expanded by default
    tipLabel: 'Layers',
  });

  map.addControl(layerSwitcher);
  map.addInteraction(new DragRotateAndZoom());
  map.addInteraction(new PinchZoom());
  coastlineLayer.value = new VectorLayer({
    source: new VectorSource(),
    visible: true,
    style: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
    }),
  });
  map.addLayer(coastlineLayer.value);

  expeditionsLayer.value = new VectorLayer({
    source: new VectorSource({}),
    style: new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 4,
      }),
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'blue',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 1,
        }),
      }),
    }),
  });
  map.addLayer(expeditionsLayer.value);

  map.on('pointermove', (event) => {
    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    if (hit) {
      map.forEachFeatureAtPixel(pixel, function (feature) {
        const properties = feature.getProperties();
        if (properties.type === 'Expedition') {
          hoveredExpedition.value = properties;
          hoveredExpeditionPixel.value = pixel;
        }
      });
    } else {
      hoveredExpedition.value = null;
      hoveredExpeditionPixel.value = null;
    }
  });

  map.on('click', (evt) => {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      const properties = feature.getProperties();
      if (properties.type === 'country') {
        // Check if the feature is a country
        // TEMPORARY CODE FOR DJIBOUTI
        properties.rawData = rawData;

        selectedCountry.value = properties;

        zoomToCountry();
        drawer.value = true;
        countryLayer.value.setStyle(selectedCountryStyle); // Hide yellow circles

        if (properties.name === 'Djibouti') {
          const expeditionsFeatures = new GeoJSON().readFeatures(expeditions, {
            featureProjection: 'EPSG:4326',
          });
          expeditionsLayer.value.getSource().clear();
          expeditionsLayer.value.getSource().addFeatures(expeditionsFeatures);
        } else {
          expeditionsLayer.value.getSource().clear();
        }
      } else if (properties.type === 'Expedition') {
        // Check if the feature is an expedition

        selectedExpedition.value = properties;
        zoomToExpedition();
        drawer.value = true;
      }
      const coastlineFeature = new GeoJSON().readFeature(
        selectedCountry.value.coastline,
        {
          featureProjection: 'EPSG:4326',
        }
      );
      coastlineLayer.value.getSource().clear();
      coastlineLayer.value.getSource().addFeature(coastlineFeature);
    });
  });
});
</script>

<style scoped lang="scss">
@import '@/app.scss';

.map {
  width: calc(100vw - var(--drawer-width));
  /* height: 100vh minus header, minus footer, minus border footer*/
  height: calc(100vh - var(--header-height) - var(--footer-height) - 1px);
}

:deep(.ol-rotate) {
  top: 0.5em;
  right: 2em;
  transition: opacity 0.25s linear, visibility 0s linear;
}
.legend {
  position: absolute;
  top: 1.5em;
  left: 3.5em;
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    ol:first-child {
      list-style-type: decimal;
      padding: 0;
      margin: 0;
    }
  }
}

.legend-color {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
.custom-tooltip {
  position: absolute;
  top: calc(var(--top-tooltip) - 10px);
  left: calc(var(--left-tooltip) + 40px);
  /* top: 100px;
  left:100px; */
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  display: var(--display-tooltip, inline-block);
}
</style>
