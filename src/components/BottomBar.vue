<template>
  <v-card min-width="800px" height="auto" color="rgb(31, 31, 31)">
    <v-container class="pa-2 custom-box">
      <v-row>
        <v-col cols="8" align-self="center">
          <v-container class="custom-container">
            <v-range-slider
              track-color="transparent"
              track-fill-color="gray"
              v-model="currentThumbsArray"
              min="0"
              max="4"
              :step="1"
              :strict="true"
              @end="handleThumbsArrayChange"
            ></v-range-slider>
          </v-container>
        </v-col>

        <v-col cols="4" class="ma-0 text-end">
          <v-btn
            large
            @click="this.isEmptyDataMarker = !this.isEmptyDataMarker"
            color="primary"
            variant="elevated"
            ><span min-width="20px" v-if="isEmptyDataMarker"
              >Leere Daten ausblenden</span
            >
            <span min-width="20px" v-else>Leere Daten einblenden</span></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "BottomBar",

  emits: ["selectedAirQualityIndicesArray", "isEmptyDataMarker"],

  data() {
    return {
      title: "Set Air Pollution Range",
      subtitle: "",

      currentThumbsArray: [0, 4],
      selectedAirQualityIndexArray: [0, 1, 2, 3, 4],

      luftqualitaetsdaten: {
        0: "Sehr gut",
        1: "Gut",
        2: "Mittel",
        3: "Schlecht",
        4: "Sehr schlecht",
      },

      isEmptyDataMarker: null,
    };
  },

  mounted() {
    this.handleThumbsArrayChange();
  },

  watch: {
    isEmptyDataMarker() {
      this.$emit("isEmptyDataMarker", this.isEmptyDataMarker);
    },
  },

  methods: {
    legendItems() {
      return Object.keys(this.luftqualitaetsdaten).map((index) => ({
        text: this.luftqualitaetsdaten[index],
        color: this.getColorBasedOnIndex(index),
      }));
    },
    getColorBasedOnIndex(index) {
      const colors = ["green", "yellow", "orange", "red", "purple", "grey"];
      return colors[index] || "grey";
    },
    getColorBasedOnValue(airQualityIndex) {
      return this.getColorBasedOnIndex(airQualityIndex);
    },
    handleThumbsArrayChange() {
      const lower = parseInt(this.currentThumbsArray[0]);
      const upper = parseInt(this.currentThumbsArray[1]);

      this.selectedAirQualityIndexArray = Array.from(
        { length: upper - lower + 1 },
        (_, index) => lower + index
      );
      this.$emit(
        "selectedAirQualityIndicesArray",
        this.selectedAirQualityIndexArray
      );
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
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% 20px);
  height: 30px;
  background: linear-gradient(
    to right,
    rgb(0, 128, 0),
    rgb(255, 255, 0),
    rgb(255, 165, 0),
    rgb(255, 0, 0),
    rgb(128, 0, 128)
  );
}

.custom-box {
  position: relative;
}
</style>
