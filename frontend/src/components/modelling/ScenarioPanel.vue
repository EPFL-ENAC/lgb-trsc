<template>
  <div>
    <q-input
      v-model="selected.name"
      :label="$t('name')"
      @update:model-value="onUpdate"
      class="q-mb-md"
    />

    <div>{{ $t('tank_volume') }}</div>
    <q-slider
      v-model="selected.tank"
      :min="0"
      :max="1000"
      :step="100"
      debounce="300"
      label
      marker-labels
      @update:model-value="onUpdate"
      class="q-mb-md"
    />

    <div>{{ $t('soil_infiltration') }}</div>
    <q-slider
      v-model="selected.soilInfiltration"
      :min="0"
      :max="10"
      debounce="300"
      label
      marker-labels
      @update:model-value="onUpdate"
      class="q-mb-md"
    />

    <div>{{ $t('paved_area') }}</div>
    <q-slider
      v-model="selected.pavedArea"
      :min="0"
      :max="100"
      debounce="300"
      label
      markers
      :marker-labels="pctMarkerLabels"
      @update:model-value="onUpdate"
      class="q-mb-md"
    />

    <div>{{ $t('vegetation') }}</div>
    <div class="q-gutter-sm q-mb-md">
      <template v-for="vege in VegetationIcons" :key="vege.value">
        <q-radio
          v-model="selected.vegetation"
          :checked-icon="vege.name"
          :unchecked-icon="vege.name"
          :val="vege.value"
          :title="$t(vege.value)"
          @update:model-value="onUpdate"
        />
      </template>
    </div>

    <div>{{ $t('water_reuse') }}</div>
    <div>
      <q-checkbox
        v-model="selected.waterReuseIrrigation"
        :label="$t('irrigation')"
        @update:model-value="onUpdate"
      />
      <q-checkbox
        v-model="selected.waterReuseToilet"
        :label="$t('toilet_flushing')"
        @update:model-value="onUpdate"
        class="on-right"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ScenarioPanel',
});
</script>
<script setup lang="ts">
import { Scenario } from 'src/stores/scenarii';
import { VegetationIcons } from 'src/utils/icons';

interface Props {
  modelValue: Scenario;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const selected = ref({ ...props.modelValue });

const pctMarkerLabels = computed(() => {
  const obj = {};
  for (let i = 0; i <= 10; i++) {
    // eslint-disable-next-line
    obj[i * 10] = `${i * 10}%`;
  }
  return obj;
});

function onUpdate() {
  if (!props.modelValue) return;
  emit('update:modelValue', selected.value);
}
</script>
