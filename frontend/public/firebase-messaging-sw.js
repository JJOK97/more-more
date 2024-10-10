importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase 설정 정보
const firebaseConfig = {
	apiKey: 'AIzaSyAwXmQms2z22pe7o7Ao36bJ_bm7tZzhK2M',
	authDomain: 'moremore-f0f23.firebaseapp.com',
	projectId: 'moremore-f0f23',
	storageBucket: 'moremore-f0f23.appspot.com',
	messagingSenderId: '182835002476',
	appId: '1:182835002476:android:75bc65fee65a5546e1ac49',
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/firebase-logo.png', // 원하는 아이콘 이미지 경로로 설정
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
