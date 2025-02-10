<template>
  <div v-if="content"
    class="map-tooltip"
    :style="{
      '--display-tooltip': content ? 'inline-block' : 'none',
      '--left-tooltip': `${position?.[0] || 0}px`,
      '--top-tooltip': `${position?.[1] || 0}px`,
    }"
  >
    <!-- We need to be smart -->
    
    <span v-if="content.type === 'country'">
      {{ content.name }}
    </span>
    <span v-if="content?.type === 'Expedition'">
      <div class="expedition-tooltip">
        <p><strong>Comments:</strong> {{ content.Comments }}</p>
        <p><strong>Date:</strong> {{ content.Date }}</p>
        <p><strong>Event ID:</strong> {{ content.Event_ID }}</p>
        <p><strong>Latitude Start:</strong> {{ content.Latitude_Start }}</p>
        <p><strong>Longitude Start:</strong> {{ content.Longitude_Start }}</p>
        <p><strong>Project Code:</strong> {{ content.Project_Code }}</p>
        <p><strong>Project Name:</strong> {{ content.Project_Name }}</p>
        <p><strong>Site Name:</strong> {{ content.Site_Name }}</p>
        <p><strong>Team Members:</strong> {{ content.Team_Members }}</p>
        <p><strong>Time:</strong> {{ content.Time }}</p>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Position {
  0: number;
  1: number;
}

defineProps<{
  content?: {
    type: 'country' | 'Expedition';
    name: string;
    comments?: string;
    date?: string;
    event_id?: string;
    latitude_start?: number;
    longitude_start?: number;
    project_code?: string;
    project_name?: string;
    site_name?: string;
    team_members?: string;
    time?: string;
  };
  position?: Position;
}>();
</script>

<style scoped lang="scss">
.expedition-tooltip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  p {
    margin: 0;
  }
}
.map-tooltip {
  position: absolute;
  top: calc(var(--top-tooltip) - 10px);
  left: calc(var(--left-tooltip) + 40px);
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  display: var(--display-tooltip, inline-block);
}
</style>