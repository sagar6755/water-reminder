if ('serviceWorker' in navigator && 'Notification' in window) {
    // Register service worker
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.error('Service Worker registration failed:', error);
        });

    // Request notification permission
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted');
        } else if (permission === 'denied') {
            console.log('Notification permission denied. Notifications will not work.');
        } else {
            console.log('Notification permission is default. Please allow notifications.');
        }
    });

    // Start the reminder for every 2 minutes (120 seconds)
    setInterval(function() {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('💧 Water Reminder', {
                    body: 'Time to drink water! Stay hydrated. 😊',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Water-drop-icon.png',
                }).catch(function(error) {
                    console.error('Failed to show notification:', error);
                });
            });
        }
    }, 120000); // 120000 ms = 2 minutes
}
