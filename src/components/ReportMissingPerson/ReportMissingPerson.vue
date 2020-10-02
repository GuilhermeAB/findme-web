<template>
  <div>
    <v-snackbar v-model='snackbarIsVisible' absolute timeout='-1' color='success'>
      {{$t('REPORT_MISSING_PERSON')}}

      <template v-slot:action='{ attrs }'>
        <v-btn text color='primary' v-bind='attrs' @click='newReport'>
          {{$t('NEW')}}
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model='dialogIsVisible' fullscreen>
      <report-missing-person-details v-if='dialogIsVisible' @close='closeNewReportDialog' />
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ReportMissingPerson',
    components: {
      ReportMissingPersonDetails: () => import('./ReportMissingPersonDetails'),
    },
    data: function () {
      return {
        snackbarIsVisible: !this.dialogIsVisible,
        dialogIsVisible: false,
      };
    },
    methods: {
      newReport: function () {
        this.dialogIsVisible = true;
        this.snackbarIsVisible = false;
      },
      closeNewReportDialog: function () {
        this.dialogIsVisible = false;
        this.snackbarIsVisible = true;
      },
    },
  };
</script>
