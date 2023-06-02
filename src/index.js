import {validatIp} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');


const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');


btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);




const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09, 13],
    zoom: 13, 
});



const markerIcon = L.icon ({
iconUrl: icon,
iconSize: [30, 40],
//iconAnchor: [22, 94],
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
L.marker([51.505, -0.09, 13], {icon: markerIcon}).addTo(map);

function getData() {
    if(validatIp(ipInput.value)) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2SkQmBqz6SFsGKzAUgB9TWHWnDuTl&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(setInfo)
}
}

function handleKey(e) {
    if(e.key === 'Enter') {
        getData(); 
    }
}


function setInfo(mapData) {
    const {lat, lng, country, region, timezone} = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp; 
  
  map.setView([lat, lng]);
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}
