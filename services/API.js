import axios from "axios";

export default (
  url = "https://umweltbundesamt.api.proxy.bund.dev/api/air_data/v2"
  //url = "https://api.kanye.rest"
) => {
  return axios.create({
    baseURL: url,
  });
};
