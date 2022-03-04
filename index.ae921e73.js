import{initializeApp as v}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";import{getDatabase as I,ref as b,onValue as k}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";const x=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))g(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&g(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}};x();const h={firebasePath:"station-home",firebaseConfig:{apiKey:"AIzaSyCTVRTgXZTk5WjAMGRtxvFog0R0nElrSUk",authDomain:"weather-station-8e973.firebaseapp.com",databaseURL:"https://weather-station-8e973-default-rtdb.firebaseio.com",projectId:"weather-station-8e973",storageBucket:"weather-station-8e973.appspot.com",messagingSenderId:"270171452446",appId:"1:270171452446:web:1f42aab361155f98336a0f",measurementId:"G-3SLBPRH8D3"}},E=document.getElementById("toggle-theme"),c=document.getElementById("toggle-icon"),M=document.getElementById("toggle-text"),H=document.getElementById("todayText"),r=document.getElementById("icon-bell"),m=document.getElementById("banner-install");v(h.firebaseConfig);const B=I(),S=document.getElementById("tempValue"),l=document.getElementById("tempMin"),d=document.getElementById("tempMax"),u=document.getElementById("tempClockMin"),y=document.getElementById("tempClockMax"),C=document.getElementById("humValue"),p=document.getElementById("humMin"),f=document.getElementById("humMax"),L=document.getElementById("humClockMin"),w=document.getElementById("humClockMax"),D=b(B,h.firebasePath),F=new Date,P={weekday:"long",month:"long",day:"numeric"};H.innerHTML=new Intl.DateTimeFormat("es-US",P).format(F);k(D,t=>{const e=t.val(),i={hour:"numeric",minute:"numeric",hourCycle:"h24"};S.innerHTML=e.temperature.value+"<span>\xB0</span>",C.innerHTML=e.humidity.value+"<span>%</span>",u.innerHTML==="00:00"&&(u.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.temperature.clockMin),y.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.temperature.clockMax),L.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.humidity.clockMin),w.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.humidity.clockMax),l.innerHTML=e.temperature.min,d.innerHTML=e.temperature.max,p.innerHTML=e.humidity.min,f.innerHTML=e.humidity.max),l.innerHTML!==e.temperature.min&&(u.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.temperature.clockMin)),d.innerHTML!==e.temperature.max&&(y.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.temperature.clockMax)),p.innerHTML!==e.humidity.min&&(L.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.humidity.clockMin)),f.innerHTML!==e.humidity.max&&(w.innerHTML=new Intl.DateTimeFormat("es-US",i).format(e.humidity.clockMax)),l.innerHTML=e.temperature.min,d.innerHTML=e.temperature.max,p.innerHTML=e.humidity.min,f.innerHTML=e.humidity.max});const U=async()=>{if(await Notification.requestPermission()!=="granted"){r.src=r.src.replace("disable","active");const e={message:"Notificaciones desactivadas",timeout:5e3};MessageChannel("error").MaterialSnackbar.showSnackbar(e)}else r.src=r.src.replace("active","disable"),j()};function j(){navigator.serviceWorker.getRegistration().then(t=>{t.showNotification("Activar notificaciones",{body:"Para desactivar las notificaciones, vuelve a presionar el bot\xF3n",icon:"./assets/icon-weather.svg",badge:"./icons/weather-shot.jpg",dir:"ltr",vibrate:[100,50,100],tag:"notification-permission-active",requireInteraction:!0})}).catch(t=>console.error(t.message))}r.addEventListener("click",U);E.addEventListener("click",()=>{document.body.classList.toggle("dark"),c.src.includes("moon.svg")?(r.src=r.src.replace("light","dark"),c.src="./icons/sun.svg",M.textContent="Light Mode"):(r.src=r.src.replace("dark","light"),c.src="./icons/moon.svg",M.textContent="Dark Mode")});let a;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),a=t,R(),console.log("beforeinstallprompt event was fired.")});function R(){m.classList.remove("hidden")}m.addEventListener("click",async()=>{T(),a.prompt();const{outcome:t}=await a.userChoice;console.log(`User response to the install prompt: ${t}`),a=null});window.addEventListener("appinstalled",()=>{T(),a=null,console.log("PWA was installed")});function T(){m.classList.add("hidden")}window.addEventListener("load",()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").then(t=>{console.log("Service Worker registered!")}).catch(t=>{console.log("Service Worker registration failed: ",t)})});