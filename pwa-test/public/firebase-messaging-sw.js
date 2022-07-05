/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');

const firebaseConfig  = {
    apiKey: "AIzaSyDI76S5vmJcYAL-xm5wTVGAgoqNtmNBUqM",
    authDomain: "vue-pwa-push-b3f20.firebaseapp.com",
    projectId: "vue-pwa-push-b3f20",
    storageBucket: "vue-pwa-push-b3f20.appspot.com",
    messagingSenderId: "182646087267",
    appId: "1:182646087267:web:924adfcffee6f39b872256",
    measurementId: "G-FZ5LS5W1L3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
self.addEventListener('notificationclick', function(event) {  
    console.log('클릭')
    //알림 팝업의 버튼 액션  
    switch (event.action) {    
        case 'goTab':      
        event.waitUntil(        
            clients.matchAll({         
                type: "window",          
                includeUncontrolled: true        
            })        
            .then(function(clientList) {          
                if (clientList.length) {            
                    clientList[0].focus();          
                }        
            })      
            );      
            break;    
            default:      
            console.log(`Unknown action clicked: '${event.action}'`);     
        break;  
        case 'close':  //추가  
        event.notification.close();  
        break;
    }
});
// 백그라운드 상태에서 받은 알림 처리
messaging.setBackgroundMessageHandler((payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const title = 'Background Message Title'
  const options = {
    body: payload.data.message,
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(title, options);
});