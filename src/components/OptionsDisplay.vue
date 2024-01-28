<template>
  <v-card
    class="pa-3 custom-container"
    :title="title"
    :subtitle="subtitle"
    max-width="550px"
    height="auto"
    color="rgb(31, 31, 31)"
  >
    <v-tabs v-model="tab" bg-color="primary" class="mb-3" fixed-tabs>
      <v-tab value="one">Luftqualität</v-tab>
      <v-tab value="two">Stationen</v-tab>
      <v-tab value="three">Alle Filter</v-tab></v-tabs
    >

    <v-window v-model="tab">
      <!-- Ansicht Luftqualität -->
      <v-window-item value="one">
        <v-row>
          <v-col cols="6">
            <VueDatePicker
              v-model="apiQueryOptions.startDate"
              placeholder="Datum"
              dark
              format="dd.MM.yyyy"
              :enable-time-picker="false"
              auto-apply
              min-date="1 / 1 / 2016"
              :max-date="new Date()"
              prevent-min-max-navigation
              locale="de"
              :clearable="false"
            ></VueDatePicker>
          </v-col>

          <v-col cols="6" class="mb-3">
            <VueDatePicker
              v-model="apiQueryOptions.startHour"
              placeholder="Uhrzeit"
              dark
              time-picker
              auto-apply
              locale="de"
              :minutes-increment="0"
              no-minutes-overlay
              :clearable="false"
            >
              <template #input-icon>
                <img
                  class="input-slot-image"
                  src="./icons/clock.png"
                /> </template
            ></VueDatePicker>
          </v-col>
        </v-row>

        <v-autocomplete
          v-model="filterOptions.station"
          variant="outlined"
          clearable
          label="Bestimmte Station Anzeigen"
          :items="stationNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.network"
          variant="outlined"
          clearable
          label="Bundesländer"
          :items="networkNames"
        ></v-autocomplete>

        <v-container class="pa-0 mb-3">
          <h2 class="text-subtitle-2">
            Filter Stationen nach geographischer Lage
          </h2>
          <v-chip-group
            v-model="filterOptions.stationSettings"
            multiple
            filter
            color="primary"
            variant="tonal"
          >
            <v-chip
              v-for="stationSettingName in stationSettingNames"
              :key="stationSettingName"
              :value="stationSettingNames.indexOf(stationSettingName) + 1"
              filter
            >
              {{ stationSettingName }}
            </v-chip>
          </v-chip-group>
        </v-container>

        <v-container class="pa-0 mb-3">
          <h2 class="text-subtitle-2">Filter Stationen nach Einsatzgebiet</h2>
          <v-chip-group
            v-model="filterOptions.stationTypes"
            multiple
            filter
            color="primary"
            variant="tonal"
          >
            <v-chip
              v-for="stationTypeName in stationTypeNames"
              :key="stationTypeName"
              :value="stationTypeNames.indexOf(stationTypeName) + 1"
              filter
            >
              {{ stationTypeName }}
            </v-chip>
          </v-chip-group>
        </v-container>
      </v-window-item>

      <!-- Ansicht Stationen (nicht implementiert)-->
      <v-window-item value="two">
        <v-row>
          <v-col cols="6">
            <VueDatePicker
              v-model="apiQueryOptions.startDate"
              placeholder="Datum"
              dark
              class="mb-5"
              :enable-time-picker="false"
              auto-apply
              min-date="1 / 1 / 2016"
              :max-date="new Date()"
              prevent-min-max-navigation
              locale="de"
            ></VueDatePicker>
          </v-col>

          <v-col cols="6">
            <VueDatePicker
              v-model="apiQueryOptions.startHour"
              placeholder="Uhrzeit"
              dark
              class="mb-5"
              time-picker
              auto-apply
              locale="de"
            >
              <template #input-icon>
                <img
                  class="input-slot-image"
                  src="./icons/clock.png"
                /> </template
            ></VueDatePicker>
          </v-col>
        </v-row>

        <v-autocomplete
          v-model="filterOptions.component"
          variant="outlined"
          clearable
          label="Schadstoff"
          :items="componentNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.scope"
          variant="outlined"
          clearable
          label="Zeitbezug"
          :items="scopeNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.network"
          variant="outlined"
          clearable
          label="Bundesländer"
          :items="networkNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.station"
          variant="outlined"
          clearable
          label="Stationen"
          :items="stationNames"
        ></v-autocomplete>
      </v-window-item>

      <!-- Ansicht Alle Filter (nur zu develpoment Zwecken)-->
      <v-window-item value="three"
        ><VueDatePicker
          v-model="apiQueryOptions.startDate"
          placeholder="Start Date"
          dark
          class="mb-5"
          position="right"
          time-picker-inline
          auto-apply
          partial-flow
          min-date="1 / 1 / 2016"
          :max-date="new Date()"
          prevent-min-max-navigation
          locale="de"
        ></VueDatePicker>

        <VueDatePicker
          v-model="apiQueryOptions.endDate"
          placeholder="End Date"
          dark
          class="mb-5"
          position="right"
          time-picker-inline
          auto-apply
          partial-flow
          min-date="1 / 1 / 2016"
          :max-date="new Date()"
          prevent-min-max-navigation
          locale="de"
        ></VueDatePicker>

        <v-autocomplete
          v-model="filterOptions.component"
          variant="outlined"
          clearable
          label="Schadstoff"
          :items="componentNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.transgressionType"
          variant="outlined"
          clearable
          label="Überschreitungswert"
          :items="transgressionNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.scope"
          variant="outlined"
          clearable
          label="Zeitbezug"
          :items="scopeNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.station"
          variant="outlined"
          clearable
          label="Stationen"
          :items="stationNames"
        ></v-autocomplete>

        <v-autocomplete
          v-model="filterOptions.network"
          variant="outlined"
          clearable
          label="Bundesländer"
          :items="networkNames"
        ></v-autocomplete>

        <v-container class="pa-0 mb-3">
          <h2 class="text-subtitle-2">
            Filter Stationen nach geographischer Lage
          </h2>
          <v-chip-group v-model="filterOptions.stationSettings" multiple filter>
            <v-chip
              v-for="stationSettingName in stationSettingNames"
              :key="stationSettingName"
              filter
              variant="elevated"
            >
              {{ stationSettingName }}
            </v-chip>
          </v-chip-group>
        </v-container>

        <v-container class="pa-0 mb-3">
          <h2 class="text-subtitle-2">Filter Stationen nach Einsatzgebiet</h2>
          <v-chip-group v-model="filterOptions.stationTypes" multiple filter>
            <v-chip
              v-for="stationTypeName in stationTypeNames"
              :key="stationTypeName"
              filter
              variant="elevated"
            >
              {{ stationTypeName }}
            </v-chip>
          </v-chip-group>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import UmweltbundesamtService from "../services/UmweltbundesamtService";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "OptionsDisplay",

  emits: ["airQualityDataFetched", "filtersChanged"],

  components: {
    VueDatePicker,
  },

  watch: {
    filterOptions: {
      handler(filterOptions) {
        this.$emit("filtersChanged", filterOptions);
      },
      deep: true,
    },

    apiQueryOptions: {
      handler: "validateAndSentData",
      deep: true,
    },
  },

  async mounted() {
    await UmweltbundesamtService.fetchAndStoreAllData("de", "code");
    this.getMembersFromUBA();
    this.extractInputValues();
    this.setChipGroupValues();
    this.validateAndSentData();
  },

  data() {
    return {
      title: "Filter",
      subtitle: "Konfigurieren Sie die Filter um Messdaten einzugrenzen",
      tab: null,
      // members of UmweltbundesamtService
      stations: [],
      components: [],
      networks: [],
      scopes: [],
      stationSettings: [],
      stationTypes: [],
      transgressionTypes: [],
      // values shown in the input components
      componentNames: [],
      scopeNames: [],
      stationNames: [],
      transgressionNames: [],
      networkNames: [],
      stationSettingNames: [],
      stationTypeNames: [],
      // values to be emitted to App.vue
      apiQueryOptions: {
        startDate: new Date(),
        endDate: new Date(),
        startHour: this.getPriorHour(),
        endHour: this.getPriorHour(),
      },

      filterOptions: {
        station: null,
        component: null,
        network: null,
        scope: null,
        stationSettings: null,
        stationTypes: null,
        transgressionType: null,
      },
    };
  },

  methods: {
    getMembersFromUBA() {
      this.stations = UmweltbundesamtService.stations;
      this.components = UmweltbundesamtService.components;
      this.networks = UmweltbundesamtService.networks;
      this.scopes = UmweltbundesamtService.scopes;
      this.stationSettings = UmweltbundesamtService.stationSettings;
      this.stationTypes = UmweltbundesamtService.stationsTypes;
      this.transgressionTypes = UmweltbundesamtService.transgressionTypes;
    },
    extractInputValues() {
      this.componentNames = this.components.map((component) => component[4]);
      this.scopeNames = this.scopes.map((scope) => scope[5]);
      this.stationNames = this.stations.map((station) => station[2]);
      this.networkNames = this.networks
        .map((network) => network[2])
        .filter((network) => network !== "UBA");
      this.stationSettingNames = this.stationSettings.map(
        (stationSetting) => stationSetting[1]
      );
      this.stationTypeNames = this.stationTypes.map(
        (stationType) => stationType[1]
      );
      this.transgressionNames = this.transgressionTypes.map(
        (transgression) => transgression[1]
      );
    },
    setChipGroupValues() {
      // initialize all chip groups with all been selected
      this.filterOptions.stationSettings = this.stationSettingNames.map(
        (stationSettingName, index) => index + 1
      );
      this.filterOptions.stationTypes = this.stationTypeNames.map(
        (stationTypeName, index) => index + 1
      );
    },

    formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },

    formatHour(date) {
      const hour = date["hours"];
      return `${hour}`;
    },

    getPriorHour: function () {
      let date = new Date();
      return { hours: date.getHours() - 2, minutes: 0 }; // 2 hours prior to now because the data is not available in real time
    },

    async validateAndSentData() {
      const sendOptions = { ...this.apiQueryOptions };

      // check if all required fields are filled
      if (sendOptions.startDate === null) {
        alert("Bitte wählen Sie ein Startdatum aus.");
        return;
      } else if (sendOptions.startHour === null) {
        alert("Bitte wählen Sie eine Startzeit aus.");
        return;
      } else if (sendOptions.endDate === null) {
        alert("Bitte wählen Sie ein Enddatum aus.");
        return;
      } else if (sendOptions.endHour === null) {
        alert("Bitte wählen Sie eine Endzeit aus.");
        return;
      }

      // format the dates and hours to the required format of the API
      sendOptions.startDate = this.formatDate(sendOptions.startDate);
      sendOptions.startHour = this.formatHour(sendOptions.startHour);
      sendOptions.endDate = this.formatDate(sendOptions.endDate);
      sendOptions.endHour = this.formatHour(sendOptions.endHour);

      let airQualityData = await UmweltbundesamtService.getAirquality(
        sendOptions.startDate,
        sendOptions.startDate,
        sendOptions.startHour,
        sendOptions.startHour
      );

      // unpacking airQualityData
      airQualityData = airQualityData.data.data;

      airQualityData = new Map(
        Object.entries(airQualityData).map(([key, obj]) => {
          let values = Object.values(obj)[0];
          return [key, values];
        })
      );
      // emit the data to App.vue
      this.$emit("airQualityDataFetched", airQualityData);
    },
  },
};
</script>

<style scoped>
.custom-container {
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}
.input-slot-image {
  height: 20px;
  opacity: 0.5;
  width: auto;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
