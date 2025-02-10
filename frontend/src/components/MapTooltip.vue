<template>
  <div v-if="content"
    class="map-tooltip"
    :style="{
      width: getTooltipWidth(),
      '--display-tooltip': content ? 'inline-block' : 'none',
      '--left-tooltip': `${getLeftPosition()}px`,
      '--top-tooltip': `${getTopPosition()}px`,
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

const TOOLTIP_MAX_WIDTH = 500; // Maximum width in pixels
const TOOLTIP_MIN_WIDTH = 280; // Minimum width in pixels
const TOOLTIP_WIDTH_PERCENT = 0.25; // 25% of map width
const TOOLTIP_OFFSET = 40;
const TOOLTIP_VERTICAL_OFFSET = 10;

const getTooltipWidth = () => {
  if (!props.mapWidth) return `${TOOLTIP_MIN_WIDTH}px`;
  if (props.content?.type === 'country') return 'auto';
  
  // Calculate responsive width based on map size
  const responsiveWidth = Math.floor(props.mapWidth * TOOLTIP_WIDTH_PERCENT);
  // Clamp between min and max values
  const width = Math.min(Math.max(responsiveWidth, TOOLTIP_MIN_WIDTH), TOOLTIP_MAX_WIDTH);
  return `${width}px`;
};

const getEstimatedHeight = () => {
  if (!props.content) return 40;
  if (props.content.type === 'country') return 40;
  
  // For expeditions, calculate based on number of filled fields
  const fields = [
    props.content.comments,
    props.content.date,
    props.content.event_id,
    props.content.latitude_start,
    props.content.longitude_start,
    props.content.latitude_end,
    props.content.longitude_end,
    props.content.reef_area,
    props.content.region_name,
    props.content.sampling_site_name,
    props.content.time
  ].filter(field => field !== undefined && field !== null && field !== '');

  // Estimate height based on number of fields and grid layout
  const gridColumns = Math.floor(parseInt(getTooltipWidth(), 10) / 140); // 140px is minmax value
  const rows = Math.ceil(fields.length / gridColumns);
  return rows * 30 + 40; // 30px per row + padding
};

const getLeftPosition = () => {
  if (!props.position) return 0;
  const width = props.content?.type === 'country' ? TOOLTIP_MIN_WIDTH : 
    parseInt(getTooltipWidth(), 10);
  
  // If cursor is in the right half of the map, show tooltip on the left side
  if (props.position[0] > props.mapWidth / 2) {
    return props.position[0] - width - TOOLTIP_OFFSET;
  }
  // Otherwise show tooltip on the right side
  return props.position[0] + TOOLTIP_OFFSET;
};

const getTopPosition = () => {
  if (!props.position) return 0;
  const height = getEstimatedHeight();
  
  // If tooltip would go below the map bottom, show it above the cursor
  if (props.position[1] + height > props.mapHeight) {
    return props.position[1] - height - TOOLTIP_VERTICAL_OFFSET;
  }
  // Otherwise show below the cursor
  return props.position[1] + TOOLTIP_VERTICAL_OFFSET;
};
</script>

<style scoped lang="scss">
.expedition-tooltip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  p {
    margin: 0;
    word-break: break-word;
  }
}
.map-tooltip {
  position: absolute;
  top: var(--top-tooltip);
  left: var(--left-tooltip);
  background: white;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  display: var(--display-tooltip, inline-block);
  max-width: 90vw;
  // Add transition for smooth movement
  transition: top 0.2s ease-out, left 0.2s ease-out;
}
</style>