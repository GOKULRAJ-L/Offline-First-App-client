export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/service-worker.js';
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('Service Worker registered: ', registration);
        })
        .catch(registrationError => {
          console.log('Service Worker registration failed: ', registrationError);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
