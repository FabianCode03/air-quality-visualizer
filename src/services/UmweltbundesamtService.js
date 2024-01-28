import axios from "axios";

class UmweltbundesamtService {
  constructor() {
    // Create an axios instance called api that uses the proxy on localhost:3000 to avoid CORS issues
    this.api = axios.create({
      baseURL: "http://localhost:3000/proxy/api/air_data/v2",
    });

    // Store meta data that will be used as parameters for the API calls
    this.stations = null; // Messstationen
    this.components = null; // Schadstofftypen
    this.networks = null; // Bundesländer
    this.scopes = null; // Zeitbezug des Messwerts z.B. Acht-Stunden-Mittelwert
    this.stationSettings = null; // Geographische z.B. ländlich oder städtisch
    this.stationsTypes = null; // Hintergrund, Industrie, Verkehr
    this.transgressionTypes = null; // Überschreitungswerte z.B. "Tagesmittelwerte über 50 µg/m³"
  }

  // The fetchAndStore methods are used to fetch the data from the API and store it in the class instance
  async fetchAndStoreStations(lang, index) {
    const stations = await this.getStations(lang, index);
    this.stations = Object.values(stations.data["data"]);
  }

  async fetchAndStoreComponents(lang, code) {
    const components = await this.getComponents(lang, code);
    this.components = Object.values(components.data)
      .filter(Array.isArray)
      .filter((item, index) => index !== 0);
  }

  async fetchAndStoreNetworks(lang, index) {
    const networks = await this.getNetworks(lang, index);
    this.networks = Object.values(networks.data["data"]);
  }

  async fetchAndStoreScopes(lang, index) {
    const scopes = await this.getScopes(lang, index);
    this.scopes = Object.values(scopes.data)
      .filter(Array.isArray)
      .filter((item, index) => index !== 0);
  }

  async fetchAndStoreStationSettings(lang, index) {
    const stationSettings = await this.getStationSettings(lang, index);
    this.stationSettings = Object.values(stationSettings.data)
      .filter(Array.isArray)
      .filter((item, index) => item[0] !== "0: Id - string");
  }

  async fetchAndStoreStationsTypes(lang, index) {
    const stationsTypes = await this.getStationsTypes(lang, index);
    this.stationsTypes = Object.values(stationsTypes.data)
      .filter(Array.isArray)
      .filter((item, index) => item[0] !== "0: Id - string");
  }

  async fetchAndStoreTransgressionTypes(lang, index) {
    const transgressionTypes = await this.getTransgressionTypes(lang, index);
    this.transgressionTypes = Object.values(transgressionTypes.data)
      .filter(Array.isArray)
      .filter((item, index) => item[0] !== "0: Id - string");
  }

  // Is called once to get and store all parameters needed for regular API calls
  async fetchAndStoreAllData(lang, index) {
    await this.fetchAndStoreStations(lang, index);
    await this.fetchAndStoreComponents(lang, index);
    await this.fetchAndStoreNetworks(lang, index);
    await this.fetchAndStoreScopes(lang, index);
    await this.fetchAndStoreStationSettings(lang, index);
    await this.fetchAndStoreStationsTypes(lang, index);
    await this.fetchAndStoreTransgressionTypes(lang, index);
  }

  // This method is used to log all the data stored in the class instance for debugging purposes
  logAllMembers() {
    console.log("stations [MESSSTATIONEN]", this.stations);
    console.log("components [SCHADSTOFFE]", this.components);
    console.log("networks [BUNDESLÄNDER]", this.networks);
    console.log(
      "scopes [ZEITBEZUG DES MESSWERTS Z.B. Acht-Stunden-Mittelwert]",
      this.scopes
    );
    console.log(
      "stationSettings [GEOGRAPHISCHE Z.B. ländlich oder städtisch]",
      this.stationSettings
    );
    console.log(
      "stationsTypes [HINTERGRUND, INDUSTRIE, VERKEHR]",
      this.stationsTypes
    );
    console.log(
      "transgressionTypes [ÜBERSCHREITUNGSWERTE Z.B. 'Tagesmittelwerte über 50 µg/m³']",
      this.transgressionTypes
    );
  }

  // Thes methods are used to get the data from the API endpoints
  getStations(lang, index) {
    return this.api.get(`/stations/json?lang=${lang}&index=${index}`);
  }

  getComponents(lang, code) {
    return this.api.get(`/components/json?lang=${lang}&index=${code}`);
  }

  getNetworks(lang, index) {
    return this.api.get(`/networks/json?lang=${lang}&index=${index}`);
  }

  getScopes(lang, index) {
    return this.api.get(`/scopes/json?lang=${lang}&index=${index}`);
  }

  getStationSettings(lang) {
    return this.api.get(`/stationsettings/json?lang=${lang}`);
  }

  getStationsTypes(lang) {
    return this.api.get(`/stationtypes/json?lang=${lang}`);
  }

  getTransgressionTypes(lang) {
    return this.api.get(`/transgressiontypes/json?lang=${lang}`);
  }

  getMeta(use, lang, dateFrom, dateTo, timeFrom, timeTo) {
    return this.api.get(
      `/meta/json?use=${use}&lang=${lang}&date_from=${dateFrom}&date_to=${dateTo}&time_from=${timeFrom}&time_to=${timeTo}`
    );
  }

  getAirquality(dateFrom, dateTo, timeFrom, timeTo) {
    return this.api.get(
      `/airquality/json?date_from=${dateFrom}&time_from=${timeFrom}&date_to=${dateTo}&time_to=${timeTo}`
    );
  }

  getStationUpTime() {
    return this.api.get(`/airquality/limits`);
  }

  getMeasure(dateFrom, dateTo, timeFrom, timeTo, stationId, component, scope) {
    return this.api.get(
      `/measures/json?date_from=${dateFrom}&time_from=${timeFrom}&date_to=${dateTo}&time_to=${timeTo}&station=${stationId}&component=${component}&scope=${scope}`
    );
  }

  getMeasureLimits() {
    return this.api.get(`/measures/limits`);
  }

  getTransgressions(year, lang, index) {
    return this.api.get(
      `/transgressions/json?component=1&year=${year}&lang=${lang}&index=${index}`
    );
  }

  getAnnualBalances(year, lang, index) {
    return this.api.get(
      `/annualbalances/json?component=1&year=${year}&lang=${lang}&index=${index}`
    );
  }
}

export default new UmweltbundesamtService();
