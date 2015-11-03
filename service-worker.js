'use strict';
/*
self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  // Estos valores son estáticos, por lo que hace falta una función que recupere los valores de forma dinámica
  
  var title = 'Notificación Push';
  var body = 'Good news everyone!';
  var icon = '/images/icon-192x192.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));

});*/

self.addEventListener('notificationclick', function(event) {
  var url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(

          var title = 'Titulo';
          var message = 'Mensaje';
          var icon = 'images/touch/chrome-touch-icon-192x192.png';
          var notificationTag = 'simple-push-demo-notification';

          // Add this to the data of the notification
          var urlToOpen = 'www.experian.com';
          var notificationFilter = {
            tag: 'simple-push-demo-notification'
          };
          var notificationData = {
            url: urlToOpen
          };

          if (!self.registration.getNotifications) {
            return showNotification(title, message, icon, notificationData);
          }

          return self.registration.getNotifications(notificationFilter)
            .then(function(notifications) {
              if (notifications && notifications.length > 0) {
                // Start with one to account for the new notification
                // we are adding
                var notificationCount = 1;
                for (var i = 0; i < notifications.length; i++) {
                  var existingNotification = notifications[i];
                  if (existingNotification.data &&
                    existingNotification.data.notificationCount) {
                    notificationCount +=
                      existingNotification.data.notificationCount;
                  } else {
                    notificationCount++;
                  }
                  existingNotification.close();
                }
                message = 'You have ' + notificationCount +
                  ' updates.';
                notificationData.notificationCount = notificationCount;
              }

              return showNotification(title, message, icon, notificationData);
            });
  );
});