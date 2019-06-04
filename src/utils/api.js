import axios from "axios";

export default axios.create({
  baseURL: "api.json",
  responseType: "json"
});
