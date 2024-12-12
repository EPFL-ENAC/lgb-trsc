<template>
  <div id="map" class="map"></div>
  <CountryMapPopup class="country-position" v-if="selectedCountry" :country="selectedCountry" />
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
import CountryMapPopup from 'components/CountryMapPopup.vue';

const selectedCountry = ref(null);
const coastlineLayer = ref<VectorLayer<VectorSource>|null>(null);

const geojsonObject = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [42.590275, 11.825138] // Djibouti
      },
      "properties": {
        "name": "Djibouti",
        "description": "Djibouti is a country located in the Horn of Africa.",
        "visited": "Visited in 2022, 2023",
        "projects": "3D mapping, eDNA",
        "lead": "Lead by John Doe",
        "collaboration": "In collaboration with Djibouti Ministry of Environment",
        "sites": "10 sites visited",
        "samples": "300 samples collected",
        "divers": "5 local divers trained",
        "monitoring": "50 permanent monitoring sites in service",
        "coastline": {
          "type": "Polygon",
          "coordinates": [[
  [42.7152, 11.1150],  // Southernmost point near Gulf of Aden
  [43.2000, 11.5750],  // Along the coastline near the middle
  [43.2970, 11.9820],  // Northeastern point near the Red Sea
  [43.0870, 11.7320],  // Curve back towards the middle
  [42.7152, 11.1150]   // Closing the polygon
]]
        }
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [39.782334, 15.179384] // Eritrea
      },
      "properties": {
        "name": "Eritrea",
        "description": "Eritrea is a country in the Horn of Africa, with a coastline along the Red Sea.",
        "visited": "Visited in 2024, 2025",
        "projects": "3D mapping, eDNA and Seascape Genomics",
        "lead": "Lead by Guilhem",
        "collaboration": "In collaboration with Ministry of Maritime Ressources of Massawa",
        "sites": "15 sites visited",
        "samples": "458 samples collected",
        "divers": "6 local divers trained",
        "monitoring": "112 permanent monitoring sites in service",
        "coastline": {
          "type": "Polygon",
          "coordinates": [[
  [37.0891, 12.4558],  // Near southern coastline
  [39.9705, 14.7901],  // Along the central coastline
  [41.2700, 16.5690],  // Northeastern tip
  [39.0800, 16.1790],  // Near northern border with Sudan
  [37.0891, 12.4558]   // Closing the polygon
    ]]
        }
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [32.559899, 15.500654] // Sudan
      },
      "properties": {
        "name": "Sudan",
        "description": "Sudan is a country in Northeast Africa.",
        "visited": "Visited in 2021, 2022",
        "projects": "Marine biodiversity, Coastal erosion",
        "lead": "Lead by Jane Smith",
        "collaboration": "In collaboration with Sudan Marine Research Center",
        "sites": "20 sites visited",
        "samples": "500 samples collected",
        "divers": "8 local divers trained",
        "monitoring": "80 permanent monitoring sites in service",
        "coastline": {
          "type": "Polygon",
          "coordinates": [[[32.559899, 15.500654], [32.559899, 16.0], [33.0, 16.0], [33.0, 15.500654], [32.559899, 15.500654]]]
        }
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [34.851612, 31.046051] // Israel
      },
      "properties": {
        "name": "Israel",
        "description": "Israel is a country in the Middle East, on the southeastern shore of the Mediterranean Sea.",
        "visited": "Visited in 2023, 2024",
        "projects": "Coral reef restoration, Marine pollution",
        "lead": "Lead by Michael Cohen",
        "collaboration": "In collaboration with Israel Oceanographic and Limnological Research",
        "sites": "12 sites visited",
        "samples": "350 samples collected",
        "divers": "7 local divers trained",
        "monitoring": "90 permanent monitoring sites in service",
        "coastline": {
          "type": "Polygon",
          "coordinates": [[[34.851612, 31.046051], [34.851612, 31.5], [35.0, 31.5], [35.0, 31.046051], [34.851612, 31.046051]]]
        }
      }
    }
  ]
};

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
    })
  });

  map.addLayer(coastlineLayer.value);

  map.on('click', function (evt) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      selectedCountry.value = feature.getProperties();
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

.country-position {
  position: absolute;
  top: calc(var(--header-height) + 12rem);
  right: 10px;
  transform: translateY(-50%);
}
</style>
