<template>
  <div>
    <v-snackbar v-model='snackbarIsVisible' absolute timeout='-1' color='primary'>
      {{$t('REPORT_MISSING_PERSON')}}

      <template v-slot:action='{ attrs }'>
        <v-btn text dark v-bind='attrs' @click='newReport'>
          {{$t('NEW')}}
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model='dialogIsVisible' fullscreen>
      <report-missing-person-stepper v-if='dialogIsVisible' @close='closeNewReportDialog' />
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ReportMissingPerson',
    components: {
      ReportMissingPersonStepper: () => import('./ReportMissingPersonStepper'),
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
