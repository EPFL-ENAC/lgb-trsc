<template>
  <q-dialog :maximized="$q.screen.lt.sm" v-model="showDialog" @hide="onHide">
    <q-card :style="$q.screen.lt.sm ? '' : 'width: 500px; max-width: 80vw'">
      <q-card-actions v-if="$q.screen.lt.sm" align="right">
        <q-btn flat icon="close" color="grey-6" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <q-input v-model="fromDate" :label="$t('from_date')" class="q-mb-md">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="fromDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="fromDate" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input v-model="toDate" :label="$t('to_date')">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="toDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="toDate" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
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
  name: 'TimeRangeDialog',
});
</script>
<script setup lang="ts">
import { format, parse } from 'date-fns';

interface Props {
  modelValue: boolean;
  title?: string;
  content?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const timeseriesStore = useTimeseriesChartsStore();

const showDialog = ref(props.modelValue);
const fromDate = ref<string>();
const toDate = ref<string>();

const DATE_FORMAT = 'yyyy-MM-dd HH:mm';

watch(
  () => props.modelValue,
  (value) => {
    showDialog.value = value;
    fromDate.value = format(timeseriesStore.timeRange[0], DATE_FORMAT);
    toDate.value = format(timeseriesStore.timeRange[1], DATE_FORMAT);
  },
);

function onHide() {
  emit('update:modelValue', false);
}

function onApply() {
  if (!fromDate.value || !toDate.value) return;
  timeseriesStore.lastUpdatedChartID = 'timeRangeDialog';
  const newFromDate = parse(fromDate.value, DATE_FORMAT, new Date());
  const newToDate = parse(toDate.value, DATE_FORMAT, new Date());
  if (newFromDate > newToDate) return;

  timeseriesStore.timeRange = [
    newFromDate < timeseriesStore.MIN_DATE
      ? timeseriesStore.MIN_DATE
      : newFromDate,
    newToDate > timeseriesStore.MAX_DATE ? timeseriesStore.MAX_DATE : newToDate,
  ];
}
</script>
