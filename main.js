// Make sure SW is supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw-cache-site.js')
            .then(reg => {
                console.log('Service Worker: Registered');

                reg.pushManager.getSubscription().then(sub => {
                    if (sub === null) {
                        console.log('Not subscribed to push service!');

                        // Checks if notification is supported by browser
                        if ('Notification' in window) {
                            // Ask permission to the user to enable notification
                            Notification.requestPermission(status => {
                                if (status === "granted") {
                                    this.subscribeUser();
                                }
                            });
                        }
                    }
                    else {
                        console.log('Subscription object: ', sub);
                    }
                });
            })
            .catch(err => {
                console.log(`Service Worker: ERROR: ${err}`);
            });
    });
}

//===============================================================================================
// Sample notification using a button
let btn = document.getElementById('notif');
btn.onclick = () => {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(reg => {
            const opts = {
                body: "A sample notification body.",
                icon: "icons/manifest-icon-192.png",
                vibrate: [100, 50, 100],
                data: {
                    value: 1
                },
                actions: [
                    { action: "home", title: "Home page" },
                    { action: "about", title: "About page" }
                ]
            }
            reg.showNotification("Test notification", opts);
        });
    }
    else if (Notification.permission === "denied") {
        // the user has previously denied push. Can't reprompt
    }
    else {
        // Show prompt to user
    }
};
//===============================================================================================


//===============================================================================================
function subscribeUser() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true
            }).then(sub => {
                console.log("Endpoint URL: ", sub.endpoint);
            }).catch(e => {
                if (Notification.permission === "denied") {
                    console.warn('Permission for notifications was denied');
                }
                else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        });
    }
}
//===============================================================================================