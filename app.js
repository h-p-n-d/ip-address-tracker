import "./js/search.js";
import { setMap, setData } from "./js/functions.js";

fetch("http://ip-api.com/json/")
  .then((response) => response.json())
  .then((data) => {
    setData(data.query, data.city, data.regionName, data.zip, data.timezone, data.isp);
    setMap(data.lat, data.lon);
  });
