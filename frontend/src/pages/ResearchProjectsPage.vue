<template>
  <div id="map" class="map"></div>
  <q-drawer
    side="right"
    v-model="drawer"
    :width="500"
    :breakpoint="500"
    overlay
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    style="    height: -webkit-fill-available; height: -moz-available; height: fill-available; height: initial;"
  >
    <CountryMapPopup v-if="selectedCountry" :country="selectedCountry" :closeDrawer="closeDrawer" :zoomToCountry="zoomToCountry" />
    <ExpeditionMapPopup v-if="selectedExpedition" :expedition="selectedExpedition" :closeDrawer="closeDrawer" :zoomToExpedition="zoomToExpedition" />
  </q-drawer>
</template>

<script setup lang="ts">
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { ScaleLine } from 'ol/control'; // Import ScaleLine control
import { onActivated, onMounted, ref } from 'vue';
import { QDrawer } from 'quasar';
import CountryMapPopup from 'components/CountryMapPopup.vue';
import ExpeditionMapPopup from 'components/ExpeditionMapPopup.vue';
import { countries } from 'assets/data/countries';
import { expeditions }  from 'assets/data/expeditions';

const selectedCountry = ref(null);
const selectedExpedition = ref(null);
const coastlineLayer = ref<VectorLayer<VectorSource>|null>(null);
const expeditionsLayer = ref<VectorLayer<VectorSource>|null>(null);
const countryLayer = ref<VectorLayer<VectorSource>|null>(null); // Define countryLayer

const drawer = ref(false);
let map: Map;

const closeDrawer = () => {
  drawer.value = false;
  selectedCountry.value = null;
  selectedExpedition.value = null;
  coastlineLayer.value.getSource().clear();
  expeditionsLayer.value.getSource().clear();
  countryLayer.value.setStyle(countryStyle); // Reset style to show yellow circles
  zoomOutOfCountry();
};

const zoomToCountry = () => {
  if (selectedCountry.value && selectedCountry.value.coastline) {
    const coastlineFeature = new GeoJSON().readFeature(selectedCountry.value.coastline, {
      featureProjection: 'EPSG:4326'
    });
    const extent = coastlineFeature.getGeometry().getExtent();
    map.getView().fit(extent, { duration: 300 });
  }
};

const zoomToExpedition = () => {
  if (selectedExpedition.value) {
    const extent = selectedExpedition.value.geometry.getExtent();
    map.getView().fit(extent, { duration: 300 });
  }
};

const zoomOutOfCountry = () => {
  map.getView().animate({ zoom: 3, duration: 300 });
};

const geojsonObject = countries;

const countryStyle = new Style({
  image: new CircleStyle({
    radius: 10,
    fill: new Fill({
      color: 'yellow'
    })
  })
});

const selectedCountryStyle = new Style({
  image: new CircleStyle({
    radius: 0, // Hide yellow circle
    fill: new Fill({
      color: 'transparent'
    })
  })
});

countryLayer.value = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON().readFeatures(geojsonObject, {
      featureProjection: 'EPSG:4326'
    })
  }),
  style: countryStyle
});

onMounted(() => {
  map = new Map({
    target: 'map',
    pixelRatio: 2, // Enable HiDPI support
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }),
      }),
      countryLayer.value // Add countryLayer to the map
    ],
    view: new View({
      center: [39.0, 21.5], // Coordinates for the Red Sea
      zoom: 3,
      minZoom: 3, // Set minimum zoom level
      maxZoom: 18, // Set maximum zoom level
      projection: 'EPSG:4326',
      extent: [12.426939205444683, 5.438693927840603, 68.05692344846989, 34.722854975836995] // Set extent to block navigation outside the specified coordinates
    }),
    controls: [
      new ScaleLine() // Add scale line control
    ]
  });

  coastlineLayer.value = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    })});
  map.addLayer(coastlineLayer.value);

  expeditionsLayer.value = new VectorLayer({
    source: new VectorSource({}),
    style: new Style({
      stroke: new Stroke({
        color:'blue',
        width: 4
      }),
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'blue'
        }),
        stroke: new Stroke({
          color: 'white',
          width: 1
        })
      })
    })
  });
  map.addLayer(expeditionsLayer.value);

  map.on('pointermove', (event) => {
    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });

  map.on('click', (evt) => {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      const properties = feature.getProperties();
      debugger;
      if (properties.type === 'country') { // Check if the feature is a country
        selectedCountry.value = properties;
        zoomToCountry();
        drawer.value = true;
        countryLayer.value.setStyle(selectedCountryStyle); // Hide yellow circles

        if (properties.name === 'Djibouti') {
          const expeditionsFeatures = new GeoJSON().readFeatures(expeditions, {
            featureProjection: 'EPSG:4326'
          });
          expeditionsLayer.value.getSource().clear();
          expeditionsLayer.value.getSource().addFeatures(expeditionsFeatures);
        } else {
          expeditionsLayer.value.getSource().clear();
        }
      } else if (properties.type === 'Expedition') { // Check if the feature is an expedition

        selectedExpedition.value = properties;
        zoomToExpedition();
        drawer.value = true;
      }
      const coastlineFeature = new GeoJSON().readFeature(selectedCountry.value.coastline, {
        featureProjection: 'EPSG:4326'
      });
      coastlineLayer.value.getSource().clear();
      coastlineLayer.value.getSource().addFeature(coastlineFeature);
    });
  });

});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
