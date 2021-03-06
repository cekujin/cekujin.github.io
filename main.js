// Make sure SW is supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw-cache-site.js')
            .then(reg => {
                console.log('Service Worker: Registered');
            })
            .catch(err => {
                console.log(`Service Worker: ERROR: ${err}`);
            });
    });
}