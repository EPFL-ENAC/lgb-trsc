<template>
  <div v-if="content"
    class="map-tooltip"
    :style="{
      width: content.type === 'country' ? 'auto' : '400px',
      '--display-tooltip': content ? 'inline-block' : 'none',
      '--left-tooltip': `${getLeftPosition()}px`,
      '--top-tooltip': `${position?.[1] || 0}px`,
    }"
  >
    <!-- We need to be smart -->
    
    <span v-if="content.type === 'country'">
      {{ content.name }}
    </span>
    <span v-if="content?.type === 'Expedition'">
      <div class="expedition-tooltip">
        <p><strong>Comments:</strong> {{ content.comments }}</p>
        <p><strong>Date:</strong> {{ content.date }}</p>
        <p><strong>Event ID:</strong> {{ content.event_id }}</p>
        <p><strong>Latitude Start:</strong> {{ content.latitude_start }}</p>
        <p><strong>Longitude Start:</strong> {{ content.longitude_start }}</p>
        <p><strong>Latitude End:</strong> {{ content.latitude_end }}</p>
        <p><strong>Longitude End:</strong> {{ content.longitude_end }}</p>
        <p><strong>Reef Area:</strong> {{ content.reef_area }}</p>
        <p><strong>Region Name:</strong> {{ content.region_name }}</p>
        <p><strong>Sampling Site Name:</strong> {{ content.sampling_site_name }}</p>
        <p><strong>Time:</strong> {{ content.time }}</p>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Position {
  0: number;
  1: number;
}

const props = defineProps<{
  content?: {
    type: 'country' | 'Expedition';
    name: string;
    comments?: string;
    date?: string;
    event_id?: string;
    latitude_start?: number;
    latitude_end?: number;
    longitude_start?: number;
    longitude_end?: number;
    project_code?: string;
    project_name?: string;
    reef_area?: string;
    region_name?: string;
    sampling_site_name?: string;
    site_name?: string;
    team_members?: string;
    time?: string;
  };
  position?: Position;
  mapWidth: number;
  mapHeight: number;
}>();

const TOOLTIP_WIDTH = 400;
const TOOLTIP_OFFSET = 40;

const getLeftPosition = () => {
  if (!props.position) return 0;
  
  // If cursor is in the right half of the map, show tooltip on the left side
  if (props.position[0] > props.mapWidth / 2) {
    return props.position[0] - TOOLTIP_WIDTH - TOOLTIP_OFFSET;
  }
  // Otherwise show tooltip on the right side
  return props.position[0] + TOOLTIP_OFFSET;
};
</script>

<style scoped lang="scss">
.expedition-tooltip {
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 2px;
  p {
    margin: 0;
  }
}
.map-tooltip {
  position: absolute;
  top: calc(var(--top-tooltip) - 10px);
  left: var(--left-tooltip);
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  display: var(--display-tooltip, inline-block);
}
</style>