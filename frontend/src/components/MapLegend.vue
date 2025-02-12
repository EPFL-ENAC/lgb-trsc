<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <ol v-if="classColorMap">
      <li v-for="(color, className) in classColorMap" :key="className">
        <q-checkbox
          v-model="visibleClasses[className.toString()]"
          @update:model-value="() => toggleClassVisibility(className.toString())"
          dense
        >
          <template v-slot:default>
            <span class="legend-item">
              <span
                class="legend-color"
                :style="{ 'background-color': color }"
              ></span>
              {{ className }}
            </span>
          </template>
        </q-checkbox>
      </li>
    </ol>
    <ol v-else>
      <li>
        <span
          class="legend-color"
          :style="{ 'background-color': legendColor }"
        ></span>
        {{ legendText }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch, onMounted } from 'vue';
import { useMapStore } from '@/stores/mapStore';

interface ClassColorMap {
  [key: string]: string;
}

const props = defineProps<{
  selectedCountry?: string;
  selectedExpedition?: string;
  classColorMap?: ClassColorMap;
  isAbsolute?: boolean;
}>();

const mapStore = useMapStore();
const visibleClasses = ref<{ [key: string]: boolean }>({});

// Initialize all classes as visible
onMounted(() => {
  if (props.classColorMap) {
    Object.keys(props.classColorMap).forEach(className => {
      visibleClasses.value[className] = true;
    });
  }
});

// Watch for changes in classColorMap to initialize new classes
watch(() => props.classColorMap, (newClassColorMap) => {
  if (newClassColorMap) {
    Object.keys(newClassColorMap).forEach(className => {
      if (visibleClasses.value[className] === undefined) {
        visibleClasses.value[className] = true;
      }
    });
  }
}, { immediate: true });

const toggleClassVisibility = (className: string) => {
  mapStore.setClassVisibility(className.toString(), visibleClasses.value[className.toString()]);
};

const legendColor = computed(() =>
  props.selectedCountry || props.selectedExpedition ? 'blue' : 'yellow'
);

const legendText = computed(() =>
  props.selectedCountry || props.selectedExpedition
    ? 'Expedition 2023'
    : 'Countries'
);
</script>

<style scoped lang="scss">
.legend {
  position: relative;
  background: if(var(--q-dark), rgba(33, 33, 33, 0.8), rgba(255, 255, 255, 0.8));
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.legend-absolute {
    position: absolute;
    top: 1.5em;
    left: 3.5em;
    background: white;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 0;

    li {
      color: #333;
    }
  }

  ol {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      padding: 0.25rem 0;
      font-size: 0.9rem;
      color: if(var(--q-dark), #fff, #333);
    }
  }
}

.legend-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
</style>
