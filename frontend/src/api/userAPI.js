import axios from 'axios';

// 환경 변수에서 API 베이스 URL을 가져옴
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API_BASE_URL:', API_BASE_URL);

// Axios 인스턴스 생성
const api = axios.create({
	baseURL: API_BASE_URL, // 기본 URL 설정
	headers: {
		'Content-Type': 'application/json',
	},
});

// 인증번호 발송 API 요청
export const sendVerificationCode = async (email) => {
	try {
		const response = await api.post('/api/member/send-verification-code', { email });
		return response.data;
	} catch (error) {
		throw error;
	}
};

// 인증번호 검증 API 요청
export const verifyEmailCode = async (email, code) => {
	try {
		const response = await api.post('/api/member/verify-code', { email, code });
		return response.data;
	} catch (error) {
		throw error;
	}
};
