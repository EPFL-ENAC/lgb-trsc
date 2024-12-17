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
    <CountryMapPopup v-if="selectedCountry" :country="selectedCountry" :closeDrawer="closeDrawer" :zoomToCountry="zoomToCountry" />
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
import { onActivated, onMounted, ref } from 'vue';
import { QDrawer } from 'quasar';
import CountryMapPopup from 'components/CountryMapPopup.vue';
import { countries } from 'assets/data/countries';
import { expeditions }  from 'assets/data/expeditions';

const selectedCountry = ref(null);
const coastlineLayer = ref<VectorLayer<VectorSource>|null>(null);
const expeditionsLayer = ref<VectorLayer<VectorSource>|null>(null);

const drawer = ref(false);
let map: Map;

const closeDrawer = () => {
  drawer.value = false;
};

const zoomToCountry = () => {
  if (selectedCountry.value && selectedCountry.value.coastline) {
    const coastlineFeature = new GeoJSON().readFeature(selectedCountry.value.coastline, {
      featureProjection: 'EPSG:4326'
    });
    const extent = coastlineFeature.getGeometry().getExtent();
    map.getView().fit(extent, { duration: 1000 });
  }
};

const geojsonObject = countries;
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
    })});
  map.addLayer(coastlineLayer.value);

  expeditionsLayer.value = new VectorLayer({
    source: new VectorSource({}),
    // style: new Style({
    //   stroke: new Stroke({
    //     color:'blue',
    //     width: 2
    //    })
    //  }),
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
      if (properties.type === 'country') { // Check if the feature is a country
        selectedCountry.value = properties;
        drawer.value = true;


        if (properties.name === 'Djibouti') {

          const expeditionsFeatures = new GeoJSON().readFeatures(expeditions, {
            featureProjection: 'EPSG:4326'
          });
          expeditionsLayer.value.getSource().clear();
          expeditionsLayer.value.getSource().addFeatures(expeditionsFeatures);
          } else {
          expeditionsLayer.value.getSource().clear();
          }
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
