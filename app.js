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

    // Start the reminder for every 30 minutes (1800000 ms) between 7 AM and 10 PM IST
    const checkAndStartReminder = () => {
        const now = new Date();
        const indiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

        const currentHour = indiaTime.getHours();
        const currentMinute = indiaTime.getMinutes();

        // If it's between 7 AM and 10 PM IST, start the reminder
        if (currentHour >= 7 && currentHour < 22) {
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
        } else {
            console.log("It's outside the 7 AM - 10 PM window. Notifications will stop.");
            clearInterval(notificationInterval); // Stop the interval
        }
    };

    // Run the reminder every 30 minutes (1800000 ms) between 7 AM and 10 PM IST
    const notificationInterval = setInterval(checkAndStartReminder, 1800000); // 1800000 ms = 30 minutes
}
