<template>
  <GmapMap
    :center='{lat: -25.389391, lng: -49.238710}'
    :zoom='14'
    map-type-id='terrain'
    style='width: 100%; height: 800px'
  >
    <GmapMarker
      v-for='(m, index) in markers'
      :key='index'
      :position='m.position'
      :clickable='true'
      :draggable='true'
      @click='center=m.position'
    />
  </GmapMap>
</template>

<script>
  export default {
    name: 'DashboardMap',
    data: function () {
      return {
        markers: [],
        center: undefined,
      };
    },
  };
</script>
