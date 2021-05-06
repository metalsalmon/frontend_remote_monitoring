import axios from "axios";
import configData from "./config.json";

export default axios.create({
  baseURL: configData.SERVER_IP,
  headers: {
    "Content-type": "application/json"
  }
});
