import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { FIREBASE } from "./config.js";

const toggleTheme = document.getElementById('toggle-theme')
const toggleIcon = document.getElementById('toggle-icon')
const toggleText = document.getElementById('toggle-text')
const todayText = document.getElementById('todayText')
const bell = document.getElementById('icon-bell')
const bannerInstall = document.getElementById('banner-install')

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

const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    const data = {
      message: 'Notificaciones desactivadas',
      timeout: 5000
    }
    MessageChannel('error').MaterialSnackbar.showSnackbar(data);
  } else {
    showNotification()
  }
}

function showNotification () {
  // new Notification('Notificaciones activadas')
  navigator.serviceWorker.getRegistration()
    .then(registration => {
      registration.showNotification('Activar notificaciones', {
        body: 'Para desactivar las notificaciones, vuelve a presionar el botón',
        icon: './icons/icon-weather-192.png',
        badge: './icons/weather-shot.jpg',
        dir: 'ltr',
        vibrate: [100, 50, 100],
        tag: 'notification-permission-active',
        requireInteraction: true,
        actions: [
          {action: 'accept', title: 'Aceptar', icon: './icons/check-solid.svg'},
          {action: 'cancel', title: 'Cancelar', icon: './icons/cancel-solid.svg'}
        ]
      });
    })
    .catch(error => console.error(error.message))
}

bell.addEventListener('click', requestPermission);

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if (toggleIcon.src.includes('moon.svg')) {
    bell.src = bell.src.replace('light', 'dark')
    toggleIcon.src = './icons/sun.svg'
    toggleText.textContent = 'Light Mode';
  } else {
    bell.src = bell.src.replace('dark', 'light')
    toggleIcon.src = './icons/moon.svg'
    toggleText.textContent = 'Dark Mode'
  }
})

// Inicializa deferredPrompt para su uso más tarde.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene a la mini barra de información que aparezca en smartphones
  e.preventDefault();
  // Guarda el evento para que se dispare más tarde
  deferredPrompt = e;
  // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA
  showInstallPromotion();
  // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
  console.log(`'beforeinstallprompt' event was fired.`);
});

function showInstallPromotion () {
  bannerInstall.classList.remove('hidden');
}

bannerInstall.addEventListener('click', async () => {
  // Esconde la información promotora de la instalación
  hideInstallPromotion();
  // Muestre el mensaje de instalación
  deferredPrompt.prompt();
  // Espera a que el usuario responda al mensaje
  const { outcome } = await deferredPrompt.userChoice;
  // De manera opcional, envía analíticos del resultado que eligió el usuario
  console.log(`User response to the install prompt: ${outcome}`);
  // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  // Esconder la promoción de instalación de la PWA
  hideInstallPromotion();
  // Limpiar el defferedPrompt para que pueda ser eliminado por el recolector de basura
  deferredPrompt = null;
  // De manera opcional, enviar el evento de analíticos para indicar una instalación exitosa
  console.log('PWA was installed');
});

function hideInstallPromotion () {
  bannerInstall.classList.add('hidden');
}

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker registered!');
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
  }
});
