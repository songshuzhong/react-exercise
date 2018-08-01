const createServiceWorker = () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
};

export { createServiceWorker };
export default createServiceWorker;