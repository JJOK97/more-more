import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
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

		const { accessToken, refreshToken, memberId, userKey } = response.data;
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('memberId', memberId);
		localStorage.setItem('userKey', userKey);
		localStorage.setItem('phoneNumber', phoneNumber);

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
export const registerMember = async (userData) => {
	try {
		// FormData 객체 생성
		const formData = new FormData();

		// 각 필드를 개별적으로 FormData에 추가
		formData.append('accountNumber', userData.account_number);
		formData.append('address', userData.address);
		formData.append('email', userData.email);
		formData.append('phoneNumber', userData.phone_number);
		formData.append('password', userData.password);
		formData.append('birthDate', userData.birth_date);
		formData.append('name', userData.member_name);

		// 프로필 이미지가 있다면 추가
		if (userData.profile_image) {
			formData.append('profileImage', userData.profile_image);
		}

		const response = await axios.post(`${API_BASE_URL}/api/member`, formData, {
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
		// 기존의 객체 형태 응답 처리 (혹시 나중에 API가 변경될 경우를 대비)
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

export const getMemberInfo = async (memberId) => {
	try {
		const response = await api.get(`/api/member/${memberId}`);
		return response.data;
	} catch (error) {
		console.error('회원 정보 조회 오류:', error.response?.data || error.message);
		throw error;
	}
};

// 로그아웃 API 구현
export const logoutUser = async () => {
	try {
		// 로컬 스토리지에서 phoneNumber 가져오기
		const phoneNumber = localStorage.getItem('phoneNumber');

		// 로그아웃 요청 보내기
		await api.post(`/api/auth/logout`, null, {
			params: { phoneNumber }, // query string에 phoneNumber 추가
		});

		// 로그아웃 성공 시, 로컬 스토리지에서 토큰 및 사용자 정보 삭제
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('memberId');
		localStorage.removeItem('userKey');
		localStorage.removeItem('phoneNumber');

		// 로그아웃 후 로그인 페이지로 리다이렉트
		window.location.href = '/login';
	} catch (error) {
		console.error('로그아웃 오류:', error.response?.data || error.message);
		throw error;
	}
};

export default api;
