<template>
  <v-app>
    <Navbar />
    <v-main>
      <LeafletMap
        class="map-position"
        :airQualityData="airQualityData"
        :filterOptions="filterOptions"
        :germanyMapOverlay="germanyMapOverlay"
        :selectedAirQualityIndicesArray="selectedAirQualityIndicesArray"
        :isEmptyDataCircle="isEmptyDataCircle"
      />
      <DetailsDisplay
        v-if="airQualityData"
        class="details-display-position"
        :airQualityData="airQualityData"
      />
      <OptionsDisplay
        class="options-display-position"
        @airQualityDataFetched="handleAirQualityDataChanged"
        @filtersChanged="handleFiltersChanged"
      />
      <BottomBar
        class="bottom-bar-position"
        @selectedAirQualityIndicesArray="
          handleSelectedAirQualityIndicesArrayChanged
        "
        @is-empty-data-marker="handleEmptyDataMarkerChanged"
      />
      <v-btn
        @click="this.germanyMapOverlay = !this.germanyMapOverlay"
        class="toggle-borders-button"
        variant="elevated"
        color="primary"
        size="large"
        :disabled="this.filterOptions.network !== null"
      >
        <v-icon>mdi mdi-map-outline</v-icon>
        <span v-if="germanyMapOverlay">Deutschland Overlay ausblenden</span>
        <span v-else>Deutschland Overlay einblenden</span>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LeafletMap from "./components/LeafletMap.vue";
import DetailsDisplay from "./components/DetailsDisplay.vue";
import OptionsDisplay from "./components/OptionsDisplay.vue";
import BottomBar from "./components/BottomBar.vue";

export default {
  name: "App",
  components: { Navbar, LeafletMap, DetailsDisplay, OptionsDisplay, BottomBar },
  data() {
    return {
      airQualityData: null,
      filterOptions: {
        network: null,
      },
      germanyMapOverlay: true,

      selectedAirQualityIndicesArray: [],

      isEmptyDataCircle: null,
    };
  },
  methods: {
    handleAirQualityDataChanged(airQualityData) {
      if (airQualityData) {
        this.airQualityData = airQualityData;
      }
    },

    handleFiltersChanged(filterOptions) {
      this.filterOptions = filterOptions;
    },

    handleSelectedAirQualityIndicesArrayChanged(
      selectedAirQualityIndicesArray
    ) {
      this.selectedAirQualityIndicesArray = selectedAirQualityIndicesArray;
    },

    handleEmptyDataMarkerChanged(isEmptyDataCircle) {
      this.isEmptyDataCircle = isEmptyDataCircle;
    },
  },
};
</script>

<style scoped>
.map-position {
  position: relative;
}

.details-display-position {
  position: absolute;
  top: 84px;
  right: 20px;
  z-index: 1000;
}

.options-display-position {
  position: absolute;
  top: 84px;
  left: 20px;
  z-index: 1000;
}

.bottom-bar-position {
  position: absolute;
  bottom: 20px !important;
  left: 20px !important;
  z-index: 1000;
}

.toggle-borders-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
