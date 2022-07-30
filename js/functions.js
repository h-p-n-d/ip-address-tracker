const ipAddress = document.querySelector("#ip");
const ipLocation = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
let map, icon;

export function setData(ip, city, region, zipCode, time, ispData) {
  ipAddress.innerText = `${ip}`;
  ipLocation.innerText = `${city}, ${region} ${zipCode}`;
  timezone.innerText = `${time}`;
  isp.innerText = `${ispData}`;
}

export function setMap(lat, lon) {
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
