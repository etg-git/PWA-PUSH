import { ref } from '@vue/composition-api';
import '@firebase/messaging';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig  = {
    apiKey: "AIzaSyDI76S5vmJcYAL-xm5wTVGAgoqNtmNBUqM",
    authDomain: "vue-pwa-push-b3f20.firebaseapp.com",
    projectId: "vue-pwa-push-b3f20",
    storageBucket: "vue-pwa-push-b3f20.appspot.com",
    messagingSenderId: "182646087267",
    appId: "1:182646087267:web:924adfcffee6f39b872256",
    measurementId: "G-FZ5LS5W1L3"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

let token = ref<String>('');

getToken(messaging, { vapidKey: 'BEINFB0poKhAMBoeKXp9JglOMbJhG7u_ZPPpFbz2nt8sZkLIVzh2xMZlwWRWhztjKHd1qOViuTV9nhRUzXzTWoo' }).then((currentToken) => {
    if (currentToken) {
        console.log(currentToken);
        token = currentToken;
    } else {
        console.log('No Instance ID token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });

onMessage(messaging, ((payload) => {
    console.log(payload.data.title);
    const title = payload.data.title;
    // const options = {
    //     body: payload.data.message,
    //     icon: '/firebase-logo.png',
    // };
    
    
    // const notification = new Notification(title, options); // 플랫폼 제한으로 안드로이드에선 지원되지 않음.
    /* eslint-disable */
    navigator.serviceWorker.ready.then(function(registration) { 
        registration.showNotification(title, {
            body: payload.data.message,
            image: '/firebase-logo.png',
            // actions: [
            //     { title: '화면보기', action: 'goTab' },
            //     { title: '닫기', action: 'close' }
            // ]
        })
    })
}));

export {
    token,
    messaging,
};