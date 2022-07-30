import { setMap, setData } from "./functions.js";
const submit = document.querySelector("#submitBtn");
const target = document.querySelector("#target");

submit.addEventListener("click", () => {
  target.classList.remove("wrong");
  if (target.value !== "") {
    fetch(`http://ip-api.com/json/${target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setData(data.query, data.city, data.regionName, data.zip, data.timezone, data.isp);
          setMap(data.lat, data.lon);
        } else {
          target.value = "";
          target.placeholder = "Wrong IP address or domain!";
          target.classList.add("wrong");
        }
      });
  }
});
