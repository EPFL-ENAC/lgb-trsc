<template>
  <div
    v-if="loading"
    class="inset-0 flex items-center full-height justify-center"
    style="z-index: 1"
  >
    <q-spinner-dots color="primary" size="50px" />
  </div>
  <div
    v-show="!loading"
    id="maplibre-map"
    style="height: 100%; width: 100%; z-index: 100"
  ></div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MaplibreMap',
});
</script>
<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibregl-theme-switcher/styles.css';
import {
  ThemeSwitcherControl,
  ThemeDefinition,
} from 'maplibregl-theme-switcher';
import {
  AttributionControl,
  FullscreenControl,
  Map,
  MapMouseEvent,
  NavigationControl,
  ScaleControl,
  type LngLatLike,
  type StyleSpecification,
} from 'maplibre-gl';
import { DivControl } from 'src/utils/control';
import { Settings } from 'src/stores/settings';

interface Props {
  styleSpec?: string | StyleSpecification | undefined;
  center?: LngLatLike;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  themes?: ThemeDefinition[];
  position?: boolean | string | undefined;
  attribution?: string;
}
const props = withDefaults(defineProps<Props>(), {
  styleSpec: 'style.json',
  zoom: 12,
  aspectRatio: undefined,
  minZoom: 0,
  maxZoom: undefined,
  position: false,
});

const emit = defineEmits(['map:loaded', 'map:click']);

const settingsStore = useSettingsStore();

const DEFAULT_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, <a href="https://www.swisstopo.admin.ch/" target="_blank">Swisstopo</a>, <a href="https://www.epfl.ch/" target="_blank">EPFL</a>';
// to be adapted to the style.json
const DEFAULT_THEME = 'light';
const THEMES: ThemeDefinition[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'swissimage', label: 'Aerial' },
];

const loading = ref(true);

let map: Map | undefined = undefined;

onMounted(() => {
  map = new Map({
    container: 'maplibre-map',
    style: props.styleSpec || 'style.json',
    center: props.center,
    zoom: props.zoom,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
    attributionControl: false,
  });

  map.addControl(new NavigationControl());
  map.addControl(new ScaleControl());
  map.addControl(new FullscreenControl());

  const settings = settingsStore.settings;
  map.addControl(
    new ThemeSwitcherControl(THEMES, {
      defaultStyle: settings?.theme || DEFAULT_THEME,
      eventListeners: {
        onChange(event: MouseEvent, style) {
          // persist the last theme choice
          settingsStore.saveSettings({ theme: style } as Settings);
          return false;
        },
      },
    }),
  );

  map.addControl(
    new AttributionControl({
      compact: true,
      customAttribution: props.attribution || DEFAULT_ATTRIBUTION,
    }),
  );

  map.on('click', (event: MapMouseEvent) => {
    emit('map:click', event, map as Map);
  });

  if (props.position === true || props.position === 'true') {
    const positionControl = new DivControl({ id: 'map-position' });
    map.addControl(positionControl, 'bottom-left');
    map.on('mousemove', function (event: MapMouseEvent) {
      if (positionControl.container) {
        positionControl.container.innerHTML = `Lat/Lon: (${event.lngLat.lat.toFixed(4)}; ${event.lngLat.lng.toFixed(4)})`;
      }
    });
    map.on('mouseout', function () {
      if (positionControl.container) {
        positionControl.container.innerHTML = '';
      }
    });
  }

  map.once('load', () => {
    THEMES.map((th) => th.id).forEach((id) => {
      map?.setLayoutProperty(
        id,
        'visibility',
        id === settings?.theme ? 'visible' : 'none',
      );
    });
    emit('map:loaded', map as Map);
    loading.value = false;
  });
});
</script>
