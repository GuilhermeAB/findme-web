<template>
  <v-container class='pt-1'>
    <v-row justify='center' align='center'>
      <v-alert dense text color='success' width='100%' class='text-center'>
        {{$t('LAST_SEEN_PLACE')}}
      </v-alert>

      <GmapMap
        ref='mapRef'
        :center='mapCenter'
        :zoom='14'
        map-type-id='roadmap'
        :style='{ width: "100%", height: "500" + "px" }'
        @click='mapClick'
      >
        <gmap-custom-marker
          v-for='(m, index) in markers'
          :key='index'
          :marker='m.position'
        >
          <v-avatar size='70'>
            <v-img :src='markerIcon' />
          </v-avatar>
        </gmap-custom-marker>
      </GmapMap>
    </v-row>

    <v-row class='mt-5'>
      <v-btn block color='primary' :disabled='!(markers && markers[0])' @click='save'>
        {{$t('SEND')}}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';

  export default {
    name: 'ReportMissingPersonStepperLocation',
    components: {
      GmapCustomMarker: GmapCustomMarker,
    },
    props: {
      markerIcon: {
        type: String,
        default: undefined,
      },
    },
    data: function () {
      return {
        markers: [],
        center: undefined,
        mapCenter: { lat: -25.389391, lng: -49.238710 },
      };
    },
    watch: {
      markers: {
        handler: function () {
          this.$emit('location-change', (this.markers && this.markers[0]) || undefined);
        },
        deep: true,
      },
    },
    methods: {
      mapClick: function (event) {
        this.mapCenter = event.latLng;
        this.markers = [{ position: event.latLng }];
      },
      save: function () {
        this.$emit('save');
      },
    },
  };
</script>
