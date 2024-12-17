<template>
  <div id="map" class="map"></div>
  <q-drawer
    side="right"
    v-model="drawer"
    :width="500"
    :breakpoint="500"
    overlay
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <CountryMapPopup v-if="selectedCountry" :country="selectedCountry" :closeDrawer="closeDrawer" />
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
import { onMounted, ref } from 'vue';
import { QDrawer } from 'quasar';
import CountryMapPopup from 'components/CountryMapPopup.vue';
import { countries } from 'assets/data/countries';

const selectedCountry = ref(null);
const coastlineLayer = ref<VectorLayer<VectorSource>|null>(null);
const drawer = ref(false);

const closeDrawer = () => {
  drawer.value = false;
};

const geojsonObject = countries;

onMounted(() => {
  const map = new Map({
    target: 'map',
    pixelRatio: 2, // Enable HiDPI support
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(geojsonObject, {
            featureProjection: 'EPSG:4326'
          })
        }),
        style: new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({
              color: 'yellow'
            })
          })
        })
      })
    ],
    view: new View({
      center: [39.0, 21.5], // Coordinates for the Red Sea
      zoom: 5,
      projection: 'EPSG:4326',
    }),
  });

  coastlineLayer.value = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    })})
    map.addLayer(coastlineLayer.value);

    // coastlineLayer.value = new VectorLayer({
    //     source: new VectorSource(),
    //   });
  map.on('pointermove', (event) => {
    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });

  map.on('click', (evt) => {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      const properties = feature.getProperties();
      if (properties.type === 'country') { // Check if the feature is a country
        selectedCountry.value = properties;
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
