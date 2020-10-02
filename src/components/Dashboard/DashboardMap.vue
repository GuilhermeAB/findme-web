<template>
  <GmapMap
    :center='{lat: -25.389391, lng: -49.238710}'
    :zoom='14'
    map-type-id='roadmap'
    :style='{ width: "100%", height: windowMaxHeight + "px" }'
  >
    <gmap-custom-marker
      v-for='(m, index) in markers'
      :key='index'
      :marker='m.position'
    >
      <v-avatar size='70'>
        <v-img :src='m.icon' />
      </v-avatar>
    </gmap-custom-marker>
  </GmapMap>
</template>

<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';

  export default {
    name: 'DashboardMap',
    components: {
      GmapCustomMarker: GmapCustomMarker,
    },
    data: function () {
      return {
        markers: [],
        center: undefined,
        windowMaxHeight: window.innerHeight - 70,
      };
    },
    watch: {
      '$store.getters.getMissingPersonList': function () {
        const list = this.getMissingPersonList;

        this.markers = [];
        list.forEach((item) => {
          console.log(item);
          try {
            if (item.lat_long) {
              this.markers.push({
                position: JSON.parse(item.lat_long),
                icon: 'https://images.unsplash.com/photo-1601511086638-a6d6946ed7fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              });
            }
          } catch (e) {
            console.log(e);
          }
        });
      },
    },
    computed: {
      getMissingPersonList: function () {
        return this.$store.getters.getMissingPersonList;
      },
    },
    mounted: function () {
      this.$store.dispatch('loadMissingPersonList');
    },
  };
</script>
