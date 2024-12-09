<template>
  <q-dialog :maximized="$q.screen.lt.sm" v-model="showDialog" @hide="onHide">
    <q-card :style="$q.screen.lt.sm ? '' : 'width: 500px; max-width: 80vw'">
      <q-card-actions v-if="$q.screen.lt.sm" align="right">
        <q-btn flat icon="close" color="primary" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <div class="text-h6 q-mb-sm">
          {{ $t('scenarios_for_watershed', { name: stationName }) }}
        </div>
        <div>
          <q-list
            v-if="watershedScenarii.length"
            bordered
            separator
            class="q-mb-md"
          >
            <template
              v-for="scenario in watershedScenarii"
              :key="scenario.name"
            >
              <q-item>
                <q-item-section>
                  <q-item-label>{{ scenario.name }}</q-item-label>
                  <div class="q-mt-sm">
                    <q-badge color="grey-7">{{
                      `${$t('tank_volume')}: ${scenario.tank}`
                    }}</q-badge>
                    <q-badge color="grey-7" class="on-right">{{
                      `${$t('soil_infiltration')}: ${scenario.soilInfiltration}`
                    }}</q-badge>
                    <q-badge color="grey-7" class="on-right">{{
                      `${$t('paved_area')}: ${scenario.pavedArea}`
                    }}</q-badge>
                  </div>
                  <div>
                    <q-icon
                      :name="getVegetationIcon(scenario.vegetation)"
                      :title="$t(scenario.vegetation)"
                    />
                    <span
                      v-if="
                        scenario.waterReuseIrrigation ||
                        scenario.waterReuseToilet
                      "
                      color="grey-6"
                      class="on-right text-caption"
                      >{{
                        `${$t('water_reuse')}: ${scenario.waterReuseIrrigation ? $t('irrigation') : ''} ${scenario.waterReuseToilet ? $t('toilet_flushing') : ''}`
                      }}</span
                    >
                  </div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="edit"
                      @click="onEdit(scenario)"
                    />
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="onRemove(scenario)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <q-btn
            :label="$t('add_scenario')"
            color="secondary"
            icon="add"
            size="sm"
            @click="onAdd"
          />
        </div>
      </q-card-section>
      <q-card-actions v-if="$q.screen.gt.xs" align="right">
        <q-btn flat :label="$t('close')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
    <scenario-dialog
      v-model="showScenario"
      :scenario="selectedScenario"
      @apply="onApply"
      @remove="onRemove"
    />
  </q-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ScenariiDialog',
});
</script>
<script setup lang="ts">
import { Scenario } from 'src/stores/scenarii';
import ScenarioDialog from 'src/components/ScenarioDialog.vue';
import { VegetationIcons } from 'src/utils/icons';

interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (value) => {
    showDialog.value = value;
    if (value && watershedScenarii.value.length === 0) {
      onAdd();
    }
  },
);

const mapStore = useMapStore();
const scenariiStore = useScenariiStore();

const showDialog = ref(props.modelValue);
const showScenario = ref(false);

const bvProperties = computed(() => mapStore.bvSelected?.properties);
const stationName = computed(() => bvProperties.value?.stationName);
const watershedScenarii = computed(() =>
  scenariiStore.scenarii.filter((s) => s.watershed === stationName.value),
);

const selectedScenario = ref<Scenario>(
  scenariiStore.makeScenario(stationName.value),
);

function onHide() {
  emit('update:modelValue', false);
}

function onEdit(scenario: Scenario) {
  selectedScenario.value = { ...scenario };
  showScenario.value = true;
}

function onAdd() {
  selectedScenario.value = scenariiStore.makeScenario(stationName.value);
  selectedScenario.value.name = `Scenario ${watershedScenarii.value.length + 1}`;
  showScenario.value = true;
}

function onRemove(scenario: Scenario) {
  scenariiStore.removeScenario(scenario);
}

function getVegetationIcon(vegetation: string) {
  return VegetationIcons.find((v) => v.value === vegetation)?.name;
}
</script>
