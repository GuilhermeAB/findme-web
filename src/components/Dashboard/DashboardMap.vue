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
          try {
            if (item.lat_long) {
              this.markers.push({
                position: JSON.parse(item.lat_long),
                icon: `${process.env.VUE_APP_REQUEST_BASE_URL}file?name=${item.imageList[0].name}`,
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
