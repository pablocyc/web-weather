import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { FIREBASE } from "./config.js";

const toggleTheme = document.getElementById('toggle-theme')
const toggleIcon = document.getElementById('toggle-icon')
const toggleText = document.getElementById('toggle-text')
const todayText = document.getElementById('todayText')

const app = initializeApp(FIREBASE.firebaseConfig);
const db = getDatabase();

// Temperature
const tempValue = document.getElementById('tempValue')
const tempMin = document.getElementById('tempMin')
const tempMax = document.getElementById('tempMax')
const tempClockMin = document.getElementById('tempClockMin')
const tempClockMax = document.getElementById('tempClockMax')
// Humidity
const humValue = document.getElementById('humValue')
const humMin = document.getElementById('humMin')
const humMax = document.getElementById('humMax')
const humClockMin = document.getElementById('humClockMin')
const humClockMax = document.getElementById('humClockMax')

const starCountRef = ref(db, FIREBASE.firebasePath);
const date = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric' };
todayText.innerHTML = new Intl.DateTimeFormat('es-US', options).format(date);

onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  const options = { hour: "numeric", minute: "numeric", hourCycle: "h24" }

  tempValue.innerHTML = data.temperature.value + '<span>°</span>';
  humValue.innerHTML = data.humidity.value + '<span>%</span>';
  
  if (tempClockMin.innerHTML === '00:00') {
    tempClockMin.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.temperature.clockMin)
    tempClockMax.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.temperature.clockMax)
    humClockMin.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.humidity.clockMin)
    humClockMax.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.humidity.clockMax)
    tempMin.innerHTML = data.temperature.min;
    tempMax.innerHTML = data.temperature.max;
    humMin.innerHTML = data.humidity.min;
    humMax.innerHTML = data.humidity.max;
  }

  if (tempMin.innerHTML !== data.temperature.min) {
    tempClockMin.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.temperature.clockMin)
  }
  if (tempMax.innerHTML !== data.temperature.max) {
    tempClockMax.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.temperature.clockMax)
  }
  if (humMin.innerHTML !== data.humidity.min) {
    humClockMin.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.humidity.clockMin)
  }
  if (humMax.innerHTML !== data.humidity.max) {
    humClockMax.innerHTML = new Intl.DateTimeFormat('es-US', options).format(data.humidity.clockMax)
  }

  tempMin.innerHTML = data.temperature.min;
  tempMax.innerHTML = data.temperature.max;
  humMin.innerHTML = data.humidity.min;
  humMax.innerHTML = data.humidity.max;
});


toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if (toggleIcon.src.includes('moon.svg')) {
    toggleIcon.src = './icons/sun.svg'
    toggleText.textContent = 'Light Mode';
  } else {
    toggleIcon.src = './icons/moon.svg'
    toggleText.textContent = 'Dark Mode'
  }
})

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker registered!', registration);
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
  }
});