<template>
  <q-list>
    <q-item-label header class="text-h6">
      <q-icon name="model_training" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('scenarios') }}</span>
    </q-item-label>
    <q-item>
      <div v-if="scenariiStore.scenarii.length === 0" class="text-help">
        {{ $t('scenario_info') }}
      </div>
      <div v-else>
        <q-chip
          v-for="scenario in scenariiStore.scenarii"
          :key="`${scenario.watershed}:${scenario.name}`"
          removable
          @remove="onRemoveScenario(scenario)"
          size="sm"
        >
          {{ `${scenario.watershed}: ${scenario.name}` }}
        </q-chip>
      </div>
    </q-item>
    <q-item-label header>
      <span class="text-h6">
        <q-icon name="filter_alt" class="q-pb-xs" />
        <span class="q-ml-sm">{{ $t('filters') }}</span>
      </span>
      <q-btn
        flat
        no-caps
        color="primary"
        size="12px"
        icon="restart_alt"
        :label="$t('reset_filters')"
        @click="onResetFilters"
        class="q-mt-xs q-pl-xs q-pr-xs float-right"
      />
    </q-item-label>
    <q-item>
      <div v-if="filtersStore.sensors.length === 0" class="text-help">
        {{ $t('sensors_to_filter_info') }}
      </div>
      <div v-else>
        <q-chip
          v-for="id in filtersStore.sensors"
          :key="id"
          removable
          @remove="onRemoveSensor(id)"
          :style="`background: ${getSensorColor(id)}`"
          text-color="grey-2"
          size="sm"
        >
          {{ id }}
        </q-chip>
      </div>
    </q-item>
    <q-item-label header class="text-h6">
      <q-icon name="layers" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('layers') }}</span>
    </q-item-label>
    <q-item
      v-for="layer in mainLayerSelections"
      :key="layer.id"
      class="q-pt-none q-pb-none q-pl-sm q-pr-sm"
    >
      <q-item-section>
        <q-checkbox
          v-model="layer.visible"
          :label="$t(`layer.${layer.id}`)"
          @click="onToggleLayer(layer.id)"
        />
      </q-item-section>
      <q-item-section avatar>
        <q-btn
          flat
          round
          icon="help_outline"
          @click="helpStore.toggleHelp(layer.id)"
        />
      </q-item-section>
    </q-item>
    <q-list>
      <q-expansion-item
        header-class="text-secondary"
        :label="$t('other_layers')"
      >
        <q-item
          v-for="layer in otherLayerSelections"
          :key="layer.id"
          class="q-pt-none q-pb-none q-pl-sm q-pr-sm"
        >
          <q-item-section>
            <q-checkbox
              v-model="layer.visible"
              :label="$t(`layer.${layer.id}`)"
              @click="onToggleLayer(layer.id)"
            />
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              flat
              round
              icon="help_outline"
              @click="helpStore.toggleHelp(layer.id)"
            />
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
    <q-item-label header class="text-h6">
      <q-icon name="info" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('legends') }}</span>
    </q-item-label>
    <q-item-label>
      <span class="q-ml-md">{{ $t('sensors') }}</span>
    </q-item-label>
    <q-item v-for="sensor in SensorSpecs" :key="sensor.color">
      <q-item-section avatar>
        <q-avatar
          size="md"
          :style="`background: ${sensor.color}`"
          text-color="grey-3"
          >{{ sensor.label }}</q-avatar
        >
      </q-item-section>
      <q-item-section :title="sensor.device">{{ sensor.title }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayersDrawer',
});
</script>
<script setup lang="ts">
import { Scenario } from 'src/stores/scenarii';
import { SensorSpecs } from 'src/utils/options';

const mapStore = useMapStore();
const helpStore = useHelpStore();
const filtersStore = useFiltersStore();
const scenariiStore = useScenariiStore();

const mainLayersIds = [
  'river',
  'bv',
  'sensors-a',
  'sensors-b',
  'sensors-c',
  'sensors-d',
  'conduite_principale_ec',
];

const mainLayerSelections = computed(() =>
  mapStore.layerSelections.filter((layer) => mainLayersIds.includes(layer.id)),
);
const otherLayerSelections = computed(() =>
  mapStore.layerSelections.filter((layer) => !mainLayersIds.includes(layer.id)),
);

function getSensorColor(id: string) {
  return SensorSpecs.find((opt) => id.startsWith(opt.label))?.color;
}

function onToggleLayer(layerId: string) {
  mapStore.applyLayerVisibility(layerId);
}

function onResetFilters() {
  filtersStore.reset();
}

function onRemoveSensor(id: string) {
  filtersStore.toggleSensor(id);
}

function onRemoveScenario(scenario: Scenario) {
  scenariiStore.removeScenario(scenario);
}
</script>
