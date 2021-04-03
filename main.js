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

// First Step: ask permission to the user to enable notification
Notification.requestPermission(status => {});

// (optional): bind notification to button
let btn = document.getElementById('notif');
btn.onclick = () => {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(reg => {
            const opts = {
                body: "A sample notification body.",
                icon: "icons/manifest-icon-192.png",
                vibrate: [100, 50, 100],
                data: {
                    key: "GREET",
                    value: "G",
                    url: "index.html"
                },
                actions: [
                    { action: "Home", title: "Home page" },
                    { action: "About", title: "About page" }
                ]
            }
            reg.showNotification("Test notification", opts);
        });
    }
};