import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
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
				// 로그아웃 상태로 리다이렉트 (예: 로그인 페이지로)
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

// 로그인 API
export const loginUser = async (phoneNumber, password) => {
	try {
		const response = await api.post('/api/auth/login', {
			phoneNumber,
			password,
		});
		const { accessToken, refreshToken } = response.data;
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		return response.data;
	} catch (error) {
		console.error('Login error:', error.response?.data);
		throw error;
	}
};

// 토큰 갱신 API
export const refreshAccessToken = async (refreshToken) => {
	try {
		const response = await api.post('/api/auth/refresh-token', { token: refreshToken });
		return response.data;
	} catch (error) {
		console.error('Token refresh error:', error.response?.data);
		throw error;
	}
};

// 회원가입 API
export const registerMember = async (formData) => {
	try {
		const response = await api.post('/api/member', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Registration error:', error.response?.data);
		throw error;
	}
};

// 인증번호 발송 API
export const sendVerificationCode = async (email) => {
	try {
		const response = await api.post('/api/member/send-verification-code', { email });
		return response.data;
	} catch (error) {
		console.error('Verification code send error:', error.response?.data);
		throw error;
	}
};

// 인증번호 확인 API
export const verifyEmailCode = async (email, code) => {
	try {
		const response = await api.post('/api/member/verify-code', { email, code });
		return response.data;
	} catch (error) {
		console.error('Verification code check error:', error.response?.data);
		throw error;
	}
};

export default api;
