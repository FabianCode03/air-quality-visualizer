<template>
  <v-card class="pa-3 clipping" width="auto" color="rgb(31, 31, 31)">
    <v-card-title>
      {{ generalInfos.title }}
    </v-card-title>
    <v-list bg-color="rgb(31, 31, 31)">
      <v-list-item v-for="(info, index) in generalInfos.data" :key="index">
        <v-row>
          <v-col cols="1" class="mr-2">
            <v-icon :style="{ color: info.color }">{{ info.icon }}</v-icon>
          </v-col>
          <v-col>
            <v-list-item-title>{{ info.name }}</v-list-item-title>
          </v-col>
          <v-col align-self="center">
            <v-list-item-subtitle class="text-right">{{
              info.value
            }}</v-list-item-subtitle>
          </v-col>
        </v-row>
        <v-divider
          v-if="
            info.name === 'Vollständige Datensätze' ||
            info.name === 'Anzahl der Datensätze'
          "
          class="mt-4"
        ></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import UmweltbundesamtService from "../services/UmweltbundesamtService";

export default {
  name: "DetailsDisplay",

  props: {
    airQualityData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    generalInfos() {
      let incompleteDataCount = 0;
      let completeDataCount = 0;
      let veryGoodCount = 0;
      let goodCount = 0;
      let moderateCount = 0;
      let badCount = 0;
      let veryBadCount = 0;

      this.airQualityData.forEach((stationData, stationId) => {
        if (stationData[2] === 1) {
          incompleteDataCount++;
        } else if (stationData[2] === 0) {
          completeDataCount++;
        }

        switch (stationData[1]) {
          case 0:
            veryGoodCount++;
            break;
          case 1:
            goodCount++;
            break;
          case 2:
            moderateCount++;
            break;
          case 3:
            badCount++;
            break;
          case 4:
            veryBadCount++;
            break;
        }
      });

      return {
        title: "Luftqualitätsdaten",
        data: [
          {
            name: "Anzahl der Stationen",
            value: UmweltbundesamtService.stations.length,
            icon: "mdi-map-marker",
            color: "grey",
          },
          {
            name: "Anzahl der Datensätze",
            value: this.airQualityData.size,
            icon: "mdi-database",
            color: "grey",
          },
          {
            name: "Unvollständige Datensätze",
            value: incompleteDataCount,
            icon: "mdi-circle-outline",
            color: "blue",
          },
          {
            name: "Vollständige Datensätze",
            value: completeDataCount,
            icon: "mdi-circle-outline",
            color: "grey",
          },
          {
            name: "Sehr gut",
            value: veryGoodCount,
            icon: "mdi-circle",
            color: "green",
          },
          {
            name: "Gut",
            value: goodCount,
            icon: "mdi-circle",
            color: "yellow",
          },
          {
            name: "Mäßig",
            value: moderateCount,
            icon: "mdi-circle",
            color: "orange",
          },
          {
            name: "Schlecht",
            value: badCount,
            icon: "mdi-circle",
            color: "red",
          },
          {
            name: "Sehr schlecht",
            value: veryBadCount,
            icon: "mdi-circle",
            color: "purple",
          },
          {
            name: "Keine Daten",
            value:
              UmweltbundesamtService.stations.length - this.airQualityData.size,
            icon: "mdi-circle",
            color: "grey",
          },
        ],
      };
    },
  },
};
</script>

<style>
.clipping {
  clip-path: polygon(
    15px 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%,
    0 15px
  );
}
</style>
