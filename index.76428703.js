import{initializeApp as y}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";import{getDatabase as T,ref as L,onValue as I}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";const k=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}};k();const f={firebasePath:"station-home",firebaseConfig:{apiKey:"AIzaSyCTVRTgXZTk5WjAMGRtxvFog0R0nElrSUk",authDomain:"weather-station-8e973.firebaseapp.com",databaseURL:"https://weather-station-8e973-default-rtdb.firebaseio.com",projectId:"weather-station-8e973",storageBucket:"weather-station-8e973.appspot.com",messagingSenderId:"270171452446",appId:"1:270171452446:web:1f42aab361155f98336a0f",measurementId:"G-3SLBPRH8D3"}},w=document.getElementById("toggle-theme"),a=document.getElementById("toggle-icon"),g=document.getElementById("toggle-text"),x=document.getElementById("todayText"),H=document.getElementById("banner-install");y(f.firebaseConfig);const b=T(),E=document.getElementById("tempValue"),m=document.getElementById("tempMin"),s=document.getElementById("tempMax"),c=document.getElementById("tempClockMin"),p=document.getElementById("tempClockMax"),v=document.getElementById("humValue"),l=document.getElementById("humMin"),d=document.getElementById("humMax"),M=document.getElementById("humClockMin"),h=document.getElementById("humClockMax"),B=L(b,f.firebasePath),S=new Date,C={weekday:"long",month:"long",day:"numeric"};x.innerHTML=new Intl.DateTimeFormat("es-US",C).format(S);I(B,r=>{const e=r.val(),o={hour:"numeric",minute:"numeric",hourCycle:"h24"};E.innerHTML=e.temperature.value+"<span>\xB0</span>",v.innerHTML=e.humidity.value+"<span>%</span>",c.innerHTML==="00:00"&&(c.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.temperature.clockMin),p.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.temperature.clockMax),M.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.humidity.clockMin),h.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.humidity.clockMax),m.innerHTML=e.temperature.min,s.innerHTML=e.temperature.max,l.innerHTML=e.humidity.min,d.innerHTML=e.humidity.max),m.innerHTML!==e.temperature.min&&(c.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.temperature.clockMin)),s.innerHTML!==e.temperature.max&&(p.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.temperature.clockMax)),l.innerHTML!==e.humidity.min&&(M.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.humidity.clockMin)),d.innerHTML!==e.humidity.max&&(h.innerHTML=new Intl.DateTimeFormat("es-US",o).format(e.humidity.clockMax)),m.innerHTML=e.temperature.min,s.innerHTML=e.temperature.max,l.innerHTML=e.humidity.min,d.innerHTML=e.humidity.max});w.addEventListener("click",()=>{document.body.classList.toggle("dark"),a.src.includes("moon.svg")?(a.src="./icons/sun.svg",g.textContent="Light Mode"):(a.src="./icons/moon.svg",g.textContent="Dark Mode")});window.addEventListener("beforeinstallprompt",r=>{console.log(r.platforms),r.userChoice.then(function(e){console.log(e.outcome)},handleError)});window.addEventListener("load",()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").then(r=>{console.log("Service Worker registered!")}).catch(r=>{console.log("Service Worker registration failed: ",r)}),H.addEventListener("click",()=>{})});