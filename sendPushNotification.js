const webPush = require('web-push');

// Replace with your VAPID keys
const vapidPublicKey = 'BOLJjixPo_6hFWxUWwWNlh2yAPLaJBqqXZwVbNhIEsUlSoGuyNbD9wV-SQWrt7OXSuSMCeJURjFW-EyS4ix6iHw';
const vapidPrivateKey = 'whK4_qT_ld65SCWivlchQUSRzNbd6aCB6qtvooiasv4';

// Set the VAPID keys
webPush.setVapidDetails(
  'mailto:your-email@example.com', // Replace with your email
  vapidPublicKey,
  vapidPrivateKey
);

// Replace with the subscription object from the client
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/...', // Replace with client's endpoint
  keys: {
    p256dh: '...', // Replace with client's p256dh key
    auth: '...'    // Replace with client's auth key
  }
};

// Payload for the notification
const payload = JSON.stringify({
  title: '💧 Water Reminder',
  body: 'Time to drink water! Stay hydrated. 😊',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Water-drop-icon.png'
});

// Send the push notification
webPush.sendNotification(pushSubscription, payload)
  .then(response => {
    console.log('Push notification sent:', response);
  })
  .catch(error => {
    console.error('Error sending push notification:', error);
  });
