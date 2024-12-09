<template>
  <q-dialog :maximized="$q.screen.lt.sm" v-model="showDialog" @hide="onHide">
    <q-card :style="$q.screen.lt.sm ? '' : 'width: 500px; max-width: 80vw'">
      <q-card-actions v-if="$q.screen.lt.sm" align="right">
        <q-btn flat icon="close" color="primary" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <div class="text-h6 q-mb-sm">
          {{ `Sensor: ${sensorProperties?.name}` }}
        </div>
        <div>
          <q-list v-if="sensorProperties" separator>
            <q-item>
              <q-item-section>
                <q-item-label header class="text-overline">Location name</q-item-label>
              </q-item-section>
              <q-item-section>
                <span>{{ sensorProperties.locationName }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label header class="text-overline">Device</q-item-label>
              </q-item-section>
              <q-item-section>
                <span>{{ sensorProperties.sensor }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label header class="text-overline">Parameters</q-item-label>
              </q-item-section>
              <q-item-section>
                <ul class="q-pl-md">
                <template v-for="measure in sensorMeasures" :key="measure">
                  <li>{{ measure }}</li>
                </template>
              </ul>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label header class="text-overline">Color</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-icon name="circle" :style="{ color: sensorProperties.color }" size="sm"/>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label header class="text-overline">Filter data</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-checkbox v-model="selected" dense @update:model-value="onSelectionUpdate" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions v-if="$q.screen.gt.xs" align="right">
        <q-btn flat :label="$t('close')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SensorDialog',
});
</script>
<script setup lang="ts">
import { MeasureOptions } from 'src/utils/options';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const mapStore = useMapStore();
const filtersStore = useFiltersStore();

const showDialog = ref(props.modelValue);

const selected = ref<boolean>(false);

watch(
  () => props.modelValue,
  (value) => {
    showDialog.value = value;
    selected.value = filtersStore.sensors.includes(mapStore.sensorSelected?.properties.name) || false;
  },
);

const sensorProperties = computed(() => mapStore.sensorSelected?.properties);

const sensorMeasures = computed(() => sensorProperties.value?.measures
  .split('|')
  .map((m: string) => MeasureOptions.find((mo) => mo.key === m)?.label || m.replaceAll('_',' ')) || []);

function onHide() {
  emit('update:modelValue', false);
}

function onSelectionUpdate(value: boolean) {
  if (!sensorProperties.value) return;
  filtersStore.toggleSensor(sensorProperties.value.name);
}
</script>
