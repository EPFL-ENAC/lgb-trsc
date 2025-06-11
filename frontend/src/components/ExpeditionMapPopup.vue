<template>
  <div v-if="selectedExpedition" id="expedition-popup" class="popup">
    <div class="btn-group">
      <button class="close-btn" @click="closeExpedition">
        {{ t('ui.back') }}
      </button>
      <button class="download-btn" @click="() => downloadExpedition()">
        {{
          t('ui.download_summary', {
            site: selectedExpedition.sampling_site_name,
          })
        }}
      </button>
      <div v-if="isDev" class="debug-dropdown">
        <button class="debug-toggle" @click="isDebugOpen = !isDebugOpen">
          {{ isDebugOpen ? t('ui.hide_debug') : t('ui.show_debug') }}
        </button>
        <div v-if="isDebugOpen" class="debug-content">
          <div class="debug-panel">
            <div class="debug-section">
              <h4 class="debug-title">{{ t('ui.collection_data') }}</h4>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.expeditions') }}:</span>
                <span class="debug-value">{{
                  selectedExpeditions.length
                }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.location_hash') }}:</span>
                <span class="debug-value">{{
                  selectedExpedition.locationNameHash
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">{{ t('ui.selected_filters') }}</h4>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.date') }}:</span>
                <span class="debug-value">{{ selectedExpeditionDate }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.year') }}:</span>
                <span class="debug-value">{{ selectedExpeditionYear }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.experiment') }}:</span>
                <span class="debug-value">{{
                  selectedExpeditionExperiment
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">{{ t('ui.available_options') }}</h4>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.years') }}:</span>
                <span class="debug-value">{{ selectedExpeditionsYears }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.dates') }}:</span>
                <span class="debug-value">{{ selectedExpeditionsDates }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">{{ t('ui.experiments') }}:</span>
                <span class="debug-value">{{
                  selectedExpeditionsExperiments
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">{{ t('ui.relationships') }}</h4>
              <div class="debug-item">
                <span class="debug-label"
                  >{{ t('ui.years_by_experiment') }}:</span
                >
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsYearsByExperiment, null, 2)
                }}</pre>
              </div>
              <div class="debug-item">
                <span class="debug-label"
                  >{{ t('ui.dates_by_experiment') }}:</span
                >
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsDatesByExperiment, null, 2)
                }}</pre>
              </div>
              <div class="debug-item">
                <span class="debug-label"
                  >{{ t('ui.experiments_by_years') }}:</span
                >
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsExperimentsByYears, null, 2)
                }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>
      {{ selectedExpedition.reef_area }} -
      {{ selectedExpedition.sampling_site_name }}
    </h3>
    <p>
      {{ selectedExpedition.region_name }} -
      {{ selectedExpedition.event_id }}
    </p>
    <p>
      <span v-if="selectedExpedition.latitude_end">{{
        t('ui.start_position')
      }}</span>
      {{ t('ui.position') }}:
      <span v-if="selectedExpedition.latitude_start">
        N {{ formatCoordinate(selectedExpedition.latitude_start, 'N') }} E
        {{ formatCoordinate(selectedExpedition.longitude_start, 'E') }}
      </span>
    </p>
    <p v-if="selectedExpedition.latitude_end">
      {{ t('ui.end_position') }}: N
      {{ formatCoordinate(selectedExpedition.latitude_end, 'N') }} E
      {{ formatCoordinate(selectedExpedition.longitude_end, 'E') }}
    </p>
    <p>
      {{
        DateFormatter.formatDate(
          selectedExpeditionsDatesByExperiment[dateSliderIndex],
          {
            locale,
            dateStyle: 'long',
            timeStyle: 'long',
          }
        )
      }}
    </p>
    <p v-if="selectedExpedition.experiment === '3D'">
      {{ t('ui.length_transect') }}: {{ selectedExpedition.length }} m
    </p>
    <p v-if="selectedExpedition.experiment === '3D'">
      {{ t('ui.avg_depth') }}: {{ selectedExpedition.depth ?? 5 }} m
    </p>

    <hr class="expedition-separation-bar" />

    <div
      v-if="
        selectedExpeditionExperiment &&
        selectedExpeditionsDatesByExperiment.length > 1
      "
      class="date-slider-container"
    >
      <p class="date-slider-label">
        {{ t('ui.select_date') }}
      </p>
      <q-slider
        v-model="dateSliderIndex"
        :min="0"
        :max="selectedExpeditionsDatesByExperiment.length - 1"
        :step="1"
        markers
        :marker-labels="markerFormatter"
        marker-labels-class="marker-label"
        label
        :label-value="
          DateFormatter.formatDate(
            selectedExpeditionsDatesByExperiment[dateSliderIndex]
          )
        "
        @update:model-value="(newValue) => console.log(newValue)"
      />
      <hr class="expedition-separation-bar" />
    </div>

    <h2 class="first-expedition-header">
      {{
        headerMap?.[selectedExpedition.experiment] ??
        selectedExpedition.experiment
      }}
      {{ t('project') }}
    </h2>
    <div v-if="selectedExpedition.experiment === '3D'">
      <div v-if="sampleSet.length > 0">
        <q-toggle
          :model-value="selectedExpeditionSubstrateLevel"
          true-value="Substrate_coarse"
          false-value="Substrate_intermediate"
          :label="selectedExpeditionSubstrateLevel"
          @update:model-value="setSelectedExpeditionSubstrateLevel"
        ></q-toggle>
        <BarChart3DMappingExpedition
          v-if="isValidSampleSet"
          :raw-data="sampleSet"
          height="400px"
          width="410px"
          :substrate-level="selectedExpeditionSubstrateLevel"
          :tooltip="true"
          :scroll-legend="true"
          @click="toggle3DZoomedChart"
        />
        <q-dialog
          v-model="showZoomedChart"
          persistent
          :maximized="false"
          class="popup"
        >
          <q-card
            style="
              width: 80vw;
              max-width: 1200px;
              height: 80vh;
              max-height: 800px;
            "
          >
            <q-card-section class="q-pa-md row items-center justify-between">
              <h4 class="q-pa-sm q-ma-sm">{{ t('header.3d') }}</h4>
              <div class="right-actions">
                <q-toggle
                  :model-value="selectedExpeditionSubstrateLevel"
                  true-value="Substrate_coarse"
                  false-value="Substrate_intermediate"
                  :label="selectedExpeditionSubstrateLevel"
                  @update:model-value="setSelectedExpeditionSubstrateLevel"
                ></q-toggle>
                <q-btn
                  v-close-popup
                  icon="close"
                  class="close-btn"
                  flat
                  round
                  dense
                />
              </div>
            </q-card-section>
            <BarChart3DMappingExpedition
              v-if="isValidSampleSet"
              :raw-data="sampleSet"
              height="76%"
              width="90%"
              :substrate-level="selectedExpeditionSubstrateLevel"
              :tooltip="true"
              :scroll-legend="true"
            />

            <q-card-actions align="right">
              <q-btn
                :label="t('ui.view_on_map')"
                color="white"
                flat
                @click="toggle3DZoomedChart"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <hr class="expedition-separation-bar" />
      </div>
      <div
        v-if="selectedExpeditionsDatesByExperiment.length > 1"
        class="expeditions-timeseries-monitoring-group"
      >
        <StackedLine3DMappingExpeditions
          v-if="isValidSampleSet"
          :raw-data="timeSeriesSet"
          height="400px"
          width="450px"
          :substrate-level="selectedExpeditionSubstrateLevel"
          :tooltip="true"
          :scroll-legend="true"
          @click="toggle3DZoomedChartTimeseries"
        />
        <q-dialog
          v-model="showZoomedChartTimeseries"
          persistent
          :maximized="false"
          class="popup"
        >
          <q-card
            style="
              width: 80vw;
              max-width: 1200px;
              height: 80vh;
              max-height: 800px;
            "
          >
            <q-card-section class="q-pa-md row items-center justify-between">
              <h4 class="q-pa-sm q-ma-sm">{{ t('header.3d') }}</h4>
              <div class="right-actions">
                <q-toggle
                  :model-value="selectedExpeditionSubstrateLevel"
                  true-value="Substrate_coarse"
                  false-value="Substrate_intermediate"
                  :label="selectedExpeditionSubstrateLevel"
                  @update:model-value="setSelectedExpeditionSubstrateLevel"
                ></q-toggle>
                <q-btn
                  v-close-popup
                  icon="close"
                  class="close-btn"
                  flat
                  round
                  dense
                />
              </div>
            </q-card-section>
            <StackedLine3DMappingExpeditions
              v-if="isValidSampleSet"
              :raw-data="timeSeriesSet"
              height="76%"
              width="90%"
              :substrate-level="selectedExpeditionSubstrateLevel"
              :tooltip="true"
              :scroll-legend="true"
            />
            <q-card-actions align="right">
              <q-btn
                :label="t('ui.view_on_map')"
                color="white"
                flat
                @click="toggle3DZoomedChart"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div v-if="selectedExpeditionsDatesByExperiment.length > 1">
        <hr class="expedition-separation-bar" />
        <p>{{ t('ui.change_coral') }} {{ baseYear }}</p>
        <div
          class="coral-changes"
          :class="{
            'horizontal-groups':
              selectedExpeditionSubstrateLevel === 'Substrate_coarse',
          }"
        >
          <div
            v-for="(group, groupName) in summaryStats"
            :key="groupName"
            class="coral-change-group"
          >
            <h4 class="group-title">{{ groupName }}</h4>
            <div class="group-items">
              <div
                v-for="(value, key) in group"
                :key="key"
                class="coral-change-item"
              >
                <div class="coral-type">{{ key }}</div>
                <div class="change-indicator">
                  <q-icon
                    :name="value.icon as string"
                    :color="value.color as string"
                    size="md"
                  />
                  <span class="percentage" :class="value.color"
                    >{{ value.value }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
          <hr class="expedition-separation-bar" />
        </div>
      </div>
    </div>
    <div v-else>{{ t('ui.no_data') }}</div>

    <p>
      {{ t('ui.data_generated') }}
      <a href="https://josauder.github.io/deepreefmap/" target="_blank"
        >Deep Reef Map</a
      >
      {{ t('ui.methodology') }}
    </p>
    <div class="card">
      <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
      <p>{{ t('ui.in_collab') }}</p>
      <div style="display: flex; gap: 1rem">
        <div
          v-for="community in computedCountryCommunities"
          :key="community.name"
          class="logo-item"
        >
          <a :href="community.url" target="_blank" class="logo-item-link">
            <q-img
              :src="community.logo"
              :alt="community.name"
              fit="contain"
              style="height: 150px; width: 150px"
            >
            </q-img>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'; // <-- Add this import
// for now we hard code the data for Djibouti 3D Mapping
import { useMapStore } from 'stores/mapStore';
import BarChart3DMappingExpedition from 'components/BarChart3DMappingExpedition.vue';
import StackedLine3DMappingExpeditions from 'components/StackedLine3DMappingExpeditions.vue';
import { storeToRefs } from 'pinia';
import communities from 'assets/communities';
import { DateFormatter } from 'src/dateFormatter';
import { substrateLevelPresetMap } from 'maps/config/substrateOrder';
import {
  mdiTriangleSmallDown,
  mdiTriangleSmallUp,
} from '@quasar/extras/mdi-v7';

const { t, locale } = useI18n({ useScope: 'local' }); // <-- Use local scope

const isDev = ref(import.meta.env.DEV);

const headerMap: Record<string, string> = {
  '3D': t('header.3d'),
  eDNA: t('header.edna'),
  seascape_genomics: t('header.seascape_genomics'),
};

let showZoomedChart = ref(false);
const toggle3DZoomedChart = () => {
  showZoomedChart.value = !showZoomedChart.value;
};

let showZoomedChartTimeseries = ref(false);
const toggle3DZoomedChartTimeseries = () => {
  showZoomedChartTimeseries.value = !showZoomedChartTimeseries.value;
};

function markerFormatter(index: number): string {
  return DateFormatter.formatDate(
    selectedExpeditionsDatesByExperiment.value[index],
    {
      locale: locale.value,
      dateStyle: 'short',
      dateOnly: true,
    }
  );
}

const formatCoordinate = (decimal: number): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;

  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const isDebugOpen = ref(false);

const baseYear = computed(() => {
  const years = selectedExpeditionsYearsByExperiment.value;
  if (years.length > 0) {
    return years[0];
  }
  return '';
});

const mapStore = useMapStore();
const {
  selectedExpedition,
  selectedExpeditions,
  selectedExpeditionsYears,
  selectedExpeditionsExperiments,
  selectedExpeditionsDates,
  selectedExpeditionYear,
  selectedExpeditionExperiment,
  selectedExpeditionDate,
  selectedExpeditionsYearsByExperiment,
  selectedExpeditionsDatesByExperiment,
  selectedExpeditionsExperimentsByYears,
  selectedExpeditionSubstrateLevel,
  dateSliderIndex,
  isValidSampleSet,
  sampleSet,
  timeSeriesSet,
} = storeToRefs(mapStore);
const {
  closeExpedition,
  downloadExpedition,
  setSelectedExpeditionSubstrateLevel,
} = mapStore;

const summaryStats = computed(() => {
  function calculatePercentageChange(
    currentValue: number,
    previousValue: number
  ): number {
    return ((currentValue - previousValue) / previousValue) * 100;
  }

  function calculatePercentageChangeFromDataSeries(dataSerie: number[]) {
    const lastIndex = dataSerie.length - 1;
    if (lastIndex < 1) {
      return 0;
    }
    const lastLastIndex = 0;
    return calculatePercentageChange(
      dataSerie[lastIndex],
      dataSerie[lastLastIndex]
    );
  }
  const authorized_ids =
    substrateLevelPresetMap[selectedExpeditionSubstrateLevel.value];

  // Calculate all percentage changes
  const results = authorized_ids.reduce((acc, authorized_id) => {
    const timeSeries = timeSeriesSet.value.find(
      (item) => item.name === authorized_id
    );
    if (timeSeries) {
      acc[authorized_id] = calculatePercentageChangeFromDataSeries(
        timeSeries.data
      );
      acc[authorized_id] = Math.ceil(acc[authorized_id] * 100) / 100;
    }
    return acc;
  }, {} as Record<string, number>);

  // Group by categories
  const grouped: Record<
    string,
    Record<string, { value: number; icon: string; color: string }>
  > = {
    Alive: {} as Record<string, { value: number; icon: string; color: string }>,
    Dead: {} as Record<string, { value: number; icon: string; color: string }>,
    Bleached: {} as Record<
      string,
      { value: number; icon: string; color: string }
    >,
    Other: {} as Record<string, { value: number; icon: string; color: string }>,
  };

  // Sort items into groups
  authorized_ids.forEach((id) => {
    if (!results[id]) return;

    const value = results[id];
    const item = {
      value,
      icon: value >= 0 ? mdiTriangleSmallUp : mdiTriangleSmallDown,
      color: '',
    };

    if (id.toLowerCase().includes('alive')) {
      item.color = value >= 0 ? 'positive' : 'negative';
      grouped.Alive[id] = item;
    } else if (id.toLowerCase().includes('dead')) {
      item.color = value <= 0 ? 'positive' : 'negative';
      grouped.Dead[id] = item;
    } else if (id.toLowerCase().includes('bleach')) {
      item.color = value <= 0 ? 'positive' : 'negative';
      grouped.Bleached[id] = item;
    } else {
      item.color = value <= 0 ? 'positive' : 'negative';
      grouped.Other[id] = item;
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach((key) => {
    if (Object.keys(grouped[key]).length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
});

const countryLower = computed(
  () =>
    selectedExpedition.value?.country.toLowerCase().replaceAll(' ', '_') ?? ''
);

const computedCountryCommunities = computed(() => {
  return communities.filter(
    (community) =>
      community.country.toLowerCase().replaceAll(' ', '_') ===
      countryLower.value
  );
});
</script>
<i18n lang="yaml">
en:
  project: project
  header:
    3d: 3D Mapping
    edna: eDNA
    seascape_genomics: Seascape Genomics
  ui:
    back: Back
    download_summary: 'Download {site} Summary'
    show_debug: Show Debug Info
    hide_debug: Hide Debug Info
    collection_data: Collection Data
    expeditions: Expeditions
    location_hash: Location Hash
    selected_filters: Selected Filters
    date: Date
    year: Year
    experiment: Experiment
    available_options: Available Options
    years: Years
    dates: Dates
    experiments: Experiments
    relationships: Relationships
    years_by_experiment: Years by Experiment
    dates_by_experiment: Dates by Experiment
    experiments_by_years: Experiments by Years
    start_position: Start Position
    end_position: End Position
    position: Position
    length_transect: Length of the transect
    avg_depth: Average depth
    select_date: Select a date to view expedition data from different time periods
    view_on_map: View on Map
    no_data: No data available
    change_coral: Change in Coral cover since
    data_generated: Data generated with the
    methodology: methodology
    in_collab: In Collaboration with
fr:
  project: projet
  header:
    3d: Cartographie 3D
    edna: eDNA
    seascape_genomics: Génomique des paysages marins
  ui:
    back: Retour
    download_summary: 'Télécharger le résumé de {site}'
    show_debug: Afficher les infos de debug
    hide_debug: Masquer les infos de debug
    collection_data: Données de collecte
    expeditions: Expéditions
    location_hash: Hash de localisation
    selected_filters: Filtres sélectionnés
    date: Date
    year: Année
    experiment: Expérience
    available_options: Options disponibles
    years: Années
    dates: Dates
    experiments: Expériences
    relationships: Relations
    years_by_experiment: Années par expérience
    dates_by_experiment: Dates par expérience
    experiments_by_years: Expériences par années
    start_position: Position de départ
    end_position: Position de fin
    position: Position
    length_transect: Longueur du transect
    avg_depth: Profondeur moyenne
    select_date: Sélectionnez une date pour voir les données d'expédition à différentes périodes
    view_on_map: Voir sur la carte
    no_data: Pas de données disponibles
    change_coral: Changement de couverture corallienne depuis
    data_generated: Données générées avec la
    methodology: méthodologie
    in_collab: En collaboration avec
ar:
  project: مشروع
  header:
    3d: رسم الخرائط ثلاثية الأبعاد
    edna: الحمض النووي البيئي
    seascape_genomics: جينوميات المناظر البحرية
  ui:
    back: رجوع
    download_summary: 'تحميل ملخص {site}'
    show_debug: عرض معلومات التصحيح
    hide_debug: إخفاء معلومات التصحيح
    collection_data: بيانات الجمع
    expeditions: البعثات
    location_hash: تجزئة الموقع
    selected_filters: عوامل التصفية المحددة
    date: التاريخ
    year: السنة
    experiment: التجربة
    available_options: الخيارات المتاحة
    years: السنوات
    dates: التواريخ
    experiments: التجارب
    relationships: العلاقات
    years_by_experiment: السنوات حسب التجربة
    dates_by_experiment: التواريخ حسب التجربة
    experiments_by_years: التجارب حسب السنوات
    start_position: موقع البداية
    end_position: موقع النهاية
    position: الموقع
    length_transect: طول المقطع
    avg_depth: العمق المتوسط
    select_date: اختر تاريخًا لعرض بيانات البعثة من فترات زمنية مختلفة
    view_on_map: عرض على الخريطة
    no_data: لا توجد بيانات
</i18n>

<style scoped lang="scss">
.right-actions {
  display: flex;
  width: 206px;
  justify-content: space-between;
  align-self: center;
  flex-direction: column;
  margin-right: 60px;
}

.group-title {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
  margin: 0;
  margin-bottom: 7px;
}
.coral-changes {
  display: flex;
  flex-direction: column; // Default is vertical layout
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 15px;

  // Horizontal layout for Substrate_coarse
  &.horizontal-groups {
    flex-direction: row; // Groups in same row
    justify-content: space-around;

    .coral-change-group {
      // width: auto; // Instead of 100%
      // min-width: 200px; // Ensure minimum width for readability
      // max-width: 30%; // Prevent groups from getting too wide
      width: fit-content;
      min-width: 100px;
      max-width: 33%;
      font-size: 0.9rem;
    }
  }
}

.coral-change-group {
  margin-bottom: 20px;
  width: 100%;
}
.expedition-separation-bar {
  border: 1px solid #e0e0e0;
  width: 100%;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  margin-right: 60px;
}
.date-slider-container {
  margin-top: 1rem;
  // Ensure container has enough padding
  padding: 0 20px;
}
:deep(.marker-label) {
  font-size: 0.8rem;
  // Prevent overflow
  overflow: visible;
  white-space: nowrap;

  // Adjust positioning
  &.q-slider__marker-label {
    // Add some space between labels and slider
    margin-top: 8px;

    // Handle text overflow
    max-width: 100px; // Adjust as needed
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
h2 {
  color: black;
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: bold;
  font-style: italic;
}
h3 {
  color: red;
  font-size: 1.2rem;
  margin: 0rem;
  margin-bottom: 0.1rem;
}
p {
  margin: 0;
  font-size: 1rem;
}
.popup {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}

.close-btn {
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.download-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.debug-panel {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  font-family: monospace;
  font-size: 0.9rem;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}

.debug-section {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.debug-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.debug-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.debug-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
}

.debug-label {
  color: #666;
  margin-right: 8px;
  font-weight: bold;
}

.debug-value {
  color: #0066cc;
  word-break: break-word;
}

.debug-json {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin: 4px 0;
  max-height: 120px;
  overflow: auto;
  font-size: 0.85rem;
  white-space: pre-wrap;
}

.coral-changes {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.coral-change-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  background: #f5f5f5;
  border-radius: 8px;
  min-width: 120px;
}

.coral-type {
  font-weight: bold;
  margin-bottom: 5px;
}

.change-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
}

.percentage {
  font-size: 0.9rem;
  font-weight: bold;
}

.positive {
  color: #21ba45;
}
.negative {
  color: #c10015;
}
.warning {
  color: #f2c037;
}
</style>
