// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase 설정 정보
const firebaseConfig = {
	apiKey: 'AIzaSyCkl2sN3OJ_mbswLONax4DGqK6cZH3f8mM',
	authDomain: 'moremore-f0f23.firebaseapp.com',
	projectId: 'moremore-f0f23',
	storageBucket: 'moremore-f0f23.appspot.com',
	messagingSenderId: '182835002476',
	appId: '1:182835002476:web:7e74ba67055f17f8e1ac49',
	measurementId: 'G-Q6E9HJN68E',
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// VAPID 키 설정
messaging.usePublicVapidKey('BEMC4sH15uFaAGu7bsqOBayTaoEzsYc6LMSVpPmJ4a0MV1k4JlIZVYLNf2u4HDte_vEa8kXvIuevP3fM_Tkd-rQ');

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/firebase-logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
