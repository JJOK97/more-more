import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Firebase 설정 정보 (v9 SDK 사용)
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
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

console.log('userAPI', messaging);

// API Base URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Service Worker 등록 확인
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/firebase-messaging-sw.js')
		.then((registration) => {
			console.log('Service Worker 등록 성공: ', registration);
		})
		.catch((error) => {
			console.error('Service Worker 등록 실패: ', error);
		});
}

Notification.requestPermission().then((permission) => {
	if (permission === 'granted') {
		console.log('알림 권한이 허용되었습니다.');
	} else {
		console.log('알림 권한이 거부되었습니다.');
	}
});

// 액세스 토큰을 요청 헤더에 추가하는 인터셉터
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// 응답 인터셉터: 토큰 갱신 로직
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await refreshAccessToken(refreshToken);
				const { accessToken } = response;
				localStorage.setItem('accessToken', accessToken);
				api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				// 리프레시 토큰도 만료된 경우, 로그아웃 처리
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login'; // 로그아웃 상태로 리다이렉트
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

// FCM 토큰을 서버에 전송하는 함수
const sendTokenToServer = async (token, memberId) => {
	try {
		const response = await api.put(`/api/member/${memberId}/fcm-token?fcmToken=${token}`);

		if (response.status === 200) {
			console.log('FCM 토큰이 서버로 전송되었습니다.');
		} else {
			console.error('FCM 토큰 전송 중 오류가 발생했습니다.');
		}
	} catch (error) {
		console.error('FCM 토큰 전송 중 오류가 발생했습니다: ', error);
	}
};

// FCM 토큰을 요청하고 서버에 전송하는 함수
export const requestForToken = async (setFcmToken, userId) => {
	try {
		const token = await getToken(messaging, {
			vapidKey: 'BEMC4sH15uFaAGu7bsqOBayTaoEzsYc6LMSVpPmJ4a0MV1k4JlIZVYLNf2u4HDte_vEa8kXvIuevP3fM_Tkd-rQ',
			serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
		});

		if (token) {
			console.log('FCM Token:', token);
			await sendTokenToServer(token, userId); // 서버로 전송
		} else {
			console.log('등록된 토큰이 없습니다.');
		}
	} catch (error) {
		console.error('토큰을 가져오는 동안 오류가 발생했습니다: ', error);
	}
};

const validateAndUpdateFCMToken = async (memberId) => {
	if (!memberId) {
		console.error('memberId is undefined in validateAndUpdateFCMToken');
		return;
	}

	try {
		const currentToken = await getToken(messaging, {
			vapidKey: 'BEMC4sH15uFaAGu7bsqOBayTaoEzsYc6LMSVpPmJ4a0MV1k4JlIZVYLNf2u4HDte_vEa8kXvIuevP3fM_Tkd-rQ',
			serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
		});

		if (currentToken) {
			// 서버에서 현재 저장된 토큰 조회
			const response = await api.get(`/api/member/${memberId}/fcm-token`);
			const storedToken = response.data.fcmToken;

			if (currentToken !== storedToken) {
				// 토큰이 다르면 새 토큰을 서버에 전송
				await sendTokenToServer(currentToken, memberId);
				console.log('FCM 토큰이 업데이트되었습니다.');
			} else {
				console.log('FCM 토큰이 유효합니다.');
			}
		} else {
			console.log('FCM 토큰을 가져올 수 없습니다.');
			// 필요한 경우 새 토큰 생성 로직 추가
		}
	} catch (error) {
		console.error('FCM 토큰 유효성 검사 중 오류 발생:', error);
	}
};

// 로그인 API
export const loginUser = async (phoneNumber, password) => {
	try {
		const response = await api.post('/api/auth/login', {
			phoneNumber,
			password,
		});

		const { accessToken, refreshToken, memberId, userKey } = response.data;
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('memberId', memberId);
		localStorage.setItem('userKey', userKey);

		console.log('Login memberId:', memberId);

		// FCM 토큰 유효성 검사 및 업데이트
		if (memberId) {
			await validateAndUpdateFCMToken(memberId);
		} else {
			console.error('memberId is undefined after login');
		}

		return response.data;
	} catch (error) {
		console.error('로그인 오류:', error.response?.data || error.message);
		throw error;
	}
};

// 토큰 갱신 API
export const refreshAccessToken = async (refreshToken) => {
	try {
		const response = await api.post('/api/auth/refresh-token', { token: refreshToken });
		if (response.data && response.data.accessToken) {
			return { accessToken: response.data.accessToken };
		} else {
			throw new Error('Invalid response format');
		}
	} catch (error) {
		console.error('Token refresh error:', error.response?.data);
		throw error;
	}
};

// 회원가입 API
export const registerMember = async (userData, setFcmToken) => {
	try {
		const formData = new FormData();
		formData.append('accountNumber', userData.account_number);
		formData.append('address', userData.address);
		formData.append('email', userData.email);
		formData.append('phoneNumber', userData.phone_number);
		formData.append('password', userData.password);
		formData.append('birthDate', userData.birth_date);
		formData.append('name', userData.member_name);

		if (userData.profile_image) {
			formData.append('profileImage', userData.profile_image);
		}

		const response = await axios.post(`${API_BASE_URL}/api/member`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		const { memberId } = response.data; // 서버에서 반환된 userId

		// FCM 토큰 요청 후 서버에 전송
		if (typeof setFcmToken === 'function') {
			await requestForToken(setFcmToken, memberId);
		} else {
			await requestForToken((token) => {
				console.log('FCM token received:', token);
				// 여기서 토큰을 저장하거나 다른 작업을 수행할 수 있습니다.
			}, userId);
		}

		return response.data;
	} catch (error) {
		console.error('Registration error:', error.response?.data);
		throw error;
	}
};

// 인증번호 발송 API
export const sendVerificationCode = async (email) => {
	try {
		const response = await api.post(`/api/member/send-verification-code?email=${email}`);
		return response.data;
	} catch (error) {
		console.error('Verification code send error:', error.response?.data);
		throw error;
	}
};

// 인증번호 확인 API
export const verifyEmailCode = async (email, code) => {
	try {
		const response = await api.post(`/api/member/verify-code?email=${email}&verificationCode=${code}`);

		// API가 단순히 true/false를 반환하는 경우를 처리
		if (typeof response.data === 'boolean') {
			return {
				success: response.data,
				message: response.data ? '인증이 성공적으로 완료되었습니다.' : '인증번호가 일치하지 않습니다.',
			};
		}
		// 기존의 객체 형태 응답 처리
		else if (response.data && typeof response.data.success === 'boolean') {
			return {
				success: response.data.success,
				message: response.data.message || '',
			};
		} else {
			console.error('Unexpected API response format:', response.data);
			return {
				success: false,
				message: '서버 응답 형식이 올바르지 않습니다.',
			};
		}
	} catch (error) {
		console.error('Verification code check error:', error.response?.data);
		return {
			success: false,
			message: error.response?.data?.message || '인증 과정에서 오류가 발생했습니다.',
		};
	}
};

// 회원 정보 조회 API
export const getMemberInfo = async (memberId) => {
	try {
		const response = await api.get(`/api/member/${memberId}`);
		return response.data;
	} catch (error) {
		console.error('회원 정보 조회 오류:', error.response?.data || error.message);
		throw error;
	}
};

export default api;
