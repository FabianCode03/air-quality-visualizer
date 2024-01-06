import API from "./API";

export default {
  getAirqualityAPI() {
    return API().get(
      "/components/json?lang=de&index=code"
      //"/"
    );
  },
};
