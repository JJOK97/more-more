// Firebase.js (v9 SDK 사용)
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Firebase 설정 정보 (v9)
const firebaseConfig = {
	apiKey: 'AIzaSyAwXmQms2z22pe7o7Ao36bJ_bm7tZzhK2M',
	authDomain: 'moremore-f0f23.firebaseapp.com',
	projectId: 'moremore-f0f23',
	storageBucket: 'moremore-f0f23.appspot.com',
	messagingSenderId: '182835002476',
	appId: '1:182835002476:android:75bc65fee65a5546e1ac49',
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// 먼저 sendTokenToServer 함수를 정의합니다
const sendTokenToServer = async (token) => {
	console.log('Sending token to server:', token); // 확인용 로그
	try {
		const response = await fetch('http://localhost:8080/api/notifications/tokens', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: '1', // 실제 사용자 ID 입력
				fcmToken: token,
			}),
		});
		if (response.ok) {
			console.log('FCM 토큰이 서버로 전송되었습니다.');
		} else {
			console.error('FCM 토큰 전송 중 오류가 발생했습니다.');
		}
	} catch (error) {
		console.error('FCM 토큰 전송 중 오류가 발생했습니다: ', error);
	}
};

// FCM 토큰 요청 함수
export const requestForToken = async (setFcmToken) => {
	try {
		const token = await getToken(messaging, {
			vapidKey: 'BEMC4sH15uFaAGu7bsqOBayTaoEzsYc6LMSVpPmJ4a0MV1k4JlIZVYLNf2u4HDte_vEa8kXvIuevP3fM_Tkd-rQ',
			serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
		});
		if (token) {
			console.log('FCM Token:', token);
			setFcmToken(token); // 이 토큰을 서버에 전송할 수 있습니다.
			sendTokenToServer(token); // FCM 토큰을 서버로 전송
		} else {
			console.log('등록된 토큰이 없습니다.');
		}
	} catch (error) {
		console.error('토큰을 가져오는 동안 오류가 발생했습니다: ', error);
	}
};
