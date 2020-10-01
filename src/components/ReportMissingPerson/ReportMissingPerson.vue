<template>
  <div>
    <v-snackbar v-model='isVisible' timeout='-1' color='success'>
      {{$t('REPORT_MISSING_PERSON')}}

      <template v-slot:action='{ attrs }'>
        <v-btn text color='primary' v-bind='attrs' @click='newReport'>
          {{$t('NEW')}}
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model='dialogIsVisible' fullscreen>
      <report-missing-person-details @close='closeNewReportDialog' />
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
        isVisible: true,
        dialogIsVisible: false,
      };
    },
    methods: {
      newReport: function () {
        this.dialogIsVisible = true;
      },
      closeNewReportDialog: function () {
        this.dialogIsVisible = false;
      },
    },
  };
</script>
