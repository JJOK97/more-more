const sendTokenToServer = async (token) => {
	console.log('Sending token to server:', token); // 확인용 로그
	try {
		const response = await fetch('http://localhost:8080/api/notifications/tokens', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: 1, // 실제 사용자 ID 입력
				fcmToken: token,
			}),
		});

		if (response.ok) {
			console.log('FCM 토큰이 서버로 전송되었습니다.');
		} else {
			console.error('FCM 토큰 전송 중 오류가 발생했습니다. 응답 상태:', response.status);
		}
	} catch (error) {
		console.error('FCM 토큰 전송 중 오류가 발생했습니다: ', error);
	}
};
