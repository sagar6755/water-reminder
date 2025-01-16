// Convert the base64 URL-safe string to a Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4); // Add padding if needed
    const base64 = (base64String + padding)
        .replace(/-/g, '+')  // Replace '-' with '+'
        .replace(/_/g, '/'); // Replace '_' with '/'

    const rawData = atob(base64); // Decode base64
    const outputArray = new Uint8Array(rawData.length); // Create a Uint8Array of the decoded data

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Listen for push events
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Here is a default message.',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Water-drop-icon.png',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Water-drop-icon.png',
        sound: 'assets/notification-sound.mp3', // Relative path to the sound file
    };

    event.waitUntil(
        self.registration.showNotification('💧 Water Reminder', options)
    );
});

// Handle notification click events
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://sagar6755.github.io/water-reminder/') // Replace with your actual website URL
    );
});
