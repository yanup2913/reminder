if (!('serviceWorker'in navigator)) {
    alert('You need a browser that supports service workers for this demo to work.');
}
if (!('showTrigger'in Notification.prototype)) {
    alert('You need a browser with Notification Triggers support for this demo to work.');
}

if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register("/serviceWorker.js").then(function(reg) { 
            console.log("Service Worker Registered", reg); 
        }).catch(function(err) {
            console.log('Service Worker registration failed: ', err);
        });
    });

  }

Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification({detail}) {
    if (!('showTrigger'in Notification.prototype)) {
        return alert('You need a browser with Notification Triggers support for this demo to work.');
    }
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: detail.description,
          icon: '/reminder_icon.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: detail.id
          },
          showTrigger: new TimestampTrigger(detail.remindDate),
        };
        reg.showNotification(detail.title, options).then(() => {
            detail.callback();
        }).catch((err) => {
            console.log("something went wrong", err);
        });
      }).catch((err) => {
        console.log("something went wrong whike registration", err);
      });
    } else {
        console.log("permission not granted");
        Notification.requestPermission(function(status) {
            console.log('Notification permission status:', status);
        });
    }
  }


  window.addEventListener("schedule_notification", displayNotification);
  
  
  
  

  