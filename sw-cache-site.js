const cacheName = "v2";

// Call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

// Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    // Remove unwated caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call fetch event
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open cache
            caches.open(cacheName)
            .then(cache => {
                // Add response to cache
                cache.put(e.request, resClone);
            });
            
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});

// Handle notification close
self.addEventListener('notificationclose', (e) => {
    let notification = e.notification;
    console.log(notification);
});

// Handle notification click
self.addEventListener('notificationclick', e => {
    let notification = e.notification;
    let data = notification.data;
    
    if (e.action === "close") {
        notification.close();
    }
    else if (e.action === "home") {
        self.clients.openWindow('https://cekujin.github.io/');
        notification.close();
    }
    else if (e.action === "about") {
        self.clients.openWindow('https://cekujin.github.io/about.html');
        notification.close();
    }
    else {
        self.clients.openWindow('https://cekujin.github.io/');
        notification.close();
    }
});

self.addEventListener('push', e => {
    const opts = {};
   e.waitUntil(self.registration.showNotification('Title', opts));
});
