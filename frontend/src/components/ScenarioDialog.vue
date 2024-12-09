<template>
  <q-dialog :maximized="$q.screen.lt.sm" v-model="showDialog" @hide="onHide">
    <q-card :style="$q.screen.lt.sm ? '' : 'width: 500px; max-width: 80vw'">
      <q-card-actions v-if="$q.screen.lt.sm" align="right">
        <q-btn flat icon="close" color="primary" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <div class="text-h6 q-mb-sm q-pl-sm q-pr-sm">
          {{ $t('scenario_for_watershed', { name: stationName }) }}
        </div>
        <div class="q-pl-sm q-pr-sm">
          <scenario-panel v-model="watershedScenario" />
        </div>
      </q-card-section>
      <q-card-actions v-if="$q.screen.gt.xs" align="right">
        <q-btn flat :label="$t('cancel')" color="grey-6" v-close-popup />
        <q-btn
          flat
          :label="$t('apply')"
          color="primary"
          @click="onApply"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ScenarioDialog',
});
</script>
<script setup lang="ts">
import ScenarioPanel from 'src/components/modelling/ScenarioPanel.vue';
import { Scenario } from 'src/stores/scenarii';

interface Props {
  modelValue: boolean;
  scenario: Scenario;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const mapStore = useMapStore();
const scenariiStore = useScenariiStore();

const showDialog = ref(props.modelValue);

const bvProperties = computed(() => mapStore.bvSelected?.properties);
const stationName = computed(() => bvProperties.value?.stationName);
const watershedScenario = ref<Scenario>({ ...props.scenario });

watch(
  () => props.modelValue,
  (value) => {
    showDialog.value = value;
    if (value) {
      watershedScenario.value = { ...props.scenario };
    }
  },
);

function onHide() {
  emit('update:modelValue', false);
}

function onApply() {
  if (watershedScenario.value) {
    scenariiStore.applyScenario(props.scenario.name, watershedScenario.value);
  }
}
</script>
