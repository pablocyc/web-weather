import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { FIREBASE } from "./config.js";

const toggleTheme = document.getElementById('toggle-theme')
const toggleIcon = document.getElementById('toggle-icon')
export const toggleText = document.getElementById('toggle-text')
const path = "./assets/";

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

onValue(starCountRef, (snapshot) => {
  const time = new Date();
  const data = snapshot.val();

  tempValue.innerHTML = data.temperature.value + '<span>°</span>';
  humValue.innerHTML = data.humidity.value + '<span>%</span>';
  
  if (tempClockMin.innerHTML === '00:00') {
    tempClockMin.innerHTML = data.temperature.clockMin;
    tempClockMax.innerHTML = data.temperature.clockMax;
    tempMin.innerHTML = data.temperature.min;
    tempMax.innerHTML = data.temperature.max;
    humClockMin.innerHTML = data.humidity.clockMin;
    humClockMax.innerHTML = data.humidity.clockMax;
    humMin.innerHTML = data.humidity.min;
    humMax.innerHTML = data.humidity.max;
  }

  if (tempMin.innerHTML !== data.temperature.min) {
    const hourNow = time.getHours() + ":" + time.getMinutes();
    tempClockMin.innerHTML = hourNow;
    update(ref(db, FIREBASE.firebasePath + '/temperature'), {
      clockMin: hourNow
    });
  }
  if (humMin.innerHTML !== data.humidity.min) {
    const hourNow = time.getHours() + ":" + time.getMinutes();
    humClockMin.innerHTML = hourNow;
    update(ref(db, FIREBASE.firebasePath + '/humidity'), {
      clockMin: hourNow
    });
  }

  if (tempMax.innerHTML !== data.temperature.max) {
    const hourNow = time.getHours() + ":" + time.getMinutes();
    tempClockMax.innerHTML = hourNow;
    update(ref(db, FIREBASE.firebasePath + '/temperature'), {
      clockMax: hourNow
    });
  }
  if (humMax.innerHTML !== data.humidity.max) {
    const hourNow = time.getHours() + ":" + time.getMinutes();
    humClockMax.innerHTML = hourNow;
    update(ref(db, FIREBASE.firebasePath + '/humidity'), {
      clockMax: hourNow
    });
  }

  tempMin.innerHTML = data.temperature.min;
  tempMax.innerHTML = data.temperature.max;
  humMin.innerHTML = data.humidity.min;
  humMax.innerHTML = data.humidity.max;
});


toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if (toggleIcon.src.includes('moon.svg')) {
    toggleIcon.src = 'assets/sun.svg'
    toggleText.textContent = 'Light Mode';
  } else {
    toggleIcon.src = 'assets/moon.svg'
    toggleText.textContent = 'Dark Mode'
  }
})