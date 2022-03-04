// eslint-disable-next-line
const OFFLINE_VERSION = 1
const CACHE_NAME = "offline"
// Modifica esto con una diferente URL si es necesario.
const OFFLINE_URL = "offline.html"

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      // Al definir {cache: "reload"} en la nueva consulta asegurara que la respuesta no sea desde el caché de HTTP; i.e., esta será de la red.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }))
    })()
  )
  // Obliga al service worker que espera a que se convierta en uno activo.
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Permite la navegación precargada si tiene compatibilidad
      // Mira https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )

  // Le dice al service worker activo que tome el control inmediato de la página.
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  // Solo queremos llamar al event.respondWith() si es una solicitud de navegación
  // para una página HTML.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Primero, utiliza una respuesta de precarga de navegación.
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }

          // Siempre usa la red primero.
          const networkResponse = await fetch(event.request)
          return networkResponse
        } catch (error) {
          // El catch solo se dispara cuando se obtiene una excepción gracias a un error en la red.
          // Si fetch() regresa una respuesta HTTP valida con un codigo de respuesta en el rango de 4xx o 5xx, el catch() no se llamará
          console.log("Fetch failed; returning offline page instead.", error)

          const cache = await caches.open(CACHE_NAME)
          const cachedResponse = await cache.match(OFFLINE_URL)
          return cachedResponse
        }
      })()
    )
  }

  // si nuestra condición de if() es falso, el controlador de fetch no atrapará la solicitud. Si hay más controladores de fetch registrados, ellos tendrán la oportunidad de llamar a event.respondWith().
  // De lo contrario, si no hay, no se llamará a event.respondWith(), la solicitud será controlada por el buscador como si no los service worker no se hubieran involucrado.
})

self.addEventListener("push", e => {
  const data = e.data.json()
  console.log("push", data)
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "./icons/weather-shot.jpg"
  })
})

self.addEventListener("notificationclick", e => {
  const notification = e.notification
  const action = e.action

  if (action === "accept") {
    console.log("Notification accepted")
    notification.close()
  } else {
    console.log("Notification dismissed")
    notification.close()
  }
})

self.addEventListener("notificationclose", e => {
  console.log("Notification was closed", e)
})
