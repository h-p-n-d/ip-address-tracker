const ipAddress = document.querySelector("#ip");
const ipLocation = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
const submit = document.querySelector("#submitBtn");
const target = document.querySelector("#target");
let map, icon;

fetch("http://ip-api.com/json/")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setData(data.query, data.city, data.regionName, data.zip, data.timezone, data.isp);
    setMap(data.lat, data.lon);
  });

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

function setData(ip, city, region, zipCode, time, ispData) {
  ipAddress.innerText = `${ip}`;
  ipLocation.innerText = `${city}, ${region} ${zipCode}`;
  timezone.innerText = `${time}`;
  isp.innerText = `${ispData}`;
}

function setMap(lat, lon) {
  if (!map) {
    map = L.map("map", {
      dragging: false,
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      keyboard: false,
      doubleClickZoom: false,
    }).setView([lat, lon], 23);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    let myIcon = L.icon({
      iconUrl: "images/icon-location.svg",
    });
    icon = L.marker([lat, lon], { icon: myIcon }).addTo(map);
  } else {
    map.setView([lat, lon], 23);
    icon.setLatLng([lat, lon]);
  }
}
