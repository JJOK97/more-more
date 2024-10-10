import { onMessage } from 'firebase/messaging';
import { messaging } from './userAPI'; // Firebase 설정 및 messaging 가져오기
import { getToken } from 'firebase/messaging';

export const setupFCMListener = (setIsUnreadNotice) => {
	onMessage(messaging, (payload) => {
		console.log('FCM 메시지 수신: ', payload);
		setIsUnreadNotice(true); // 메시지 수신 시 읽지 않은 알림 상태를 true로 설정
	});
};

export const requestNotificationPermission = async () => {
	try {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			try {
				const token = await getToken(messaging, {
					vapidKey: 'BEMC4sH15uFaAGu7bsqOBayTaoEzsYc6LMSVpPmJ4a0MV1k4JlIZVYLNf2u4HDte_vEa8kXvIuevP3fM_Tkd-rQ',
				});
				console.log('FCM 토큰:', token);
				// 여기서 토큰을 서버로 전송
			} catch (tokenError) {
				console.error('FCM 토큰 얻기 실패:', tokenError);
				// 여기서 더 자세한 오류 정보를 로깅하거나 사용자에게 표시
			}
		} else {
			console.log('알림 권한이 거부되었습니다.');
		}
	} catch (error) {
		console.error('알림 권한 요청 실패:', error);
	}
};
