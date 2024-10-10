import React, { useState } from 'react';
import { requestForToken } from '../firebase/Firebase'; // Firebase.js에서 가져온 함수

const GetFcmToken = () => {
	const [fcmToken, setFcmToken] = useState('');

	// FCM 토큰 요청 함수 호출
	const handleGetToken = () => {
		requestForToken(setFcmToken);
	};

	return (
		<div>
			<h1>Get FCM Token</h1>
			<button onClick={handleGetToken}>FCM 토큰 받기</button>
			{fcmToken && (
				<div>
					<h3>FCM 토큰:</h3>
					<p>{fcmToken}</p>
				</div>
			)}
		</div>
	);
};

export default GetFcmToken;
