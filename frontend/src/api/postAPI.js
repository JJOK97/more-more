import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const postApi = axios.create({
	baseURL: `${API_BASE_URL}/api/posting`,
});

// 좋아요 API 호출
export const likePost = async (postingId, memberId) => {
	try {
		const response = await postApi.post(`/${postingId}/like/${memberId}`);
		return response.data;
	} catch (error) {
		console.error('Error liking the post:', error);
		throw error;
	}
};

// 좋아요 취소 API 호출
export const unlikePost = async (postingId, memberId) => {
	try {
		const response = await postApi.delete(`/${postingId}/like/${memberId}`);
		return response.data;
	} catch (error) {
		console.error('Error unliking the post:', error);
		throw error;
	}
};

// 좋아요 상태 확인 API 호출
export const checkLikeStatus = async (postingId, memberId) => {
	try {
		const response = await postApi.get(`/${postingId}/like/${memberId}`);
		return response.data; // true 또는 false 반환
	} catch (error) {
		console.error('Error checking like status:', error);
		throw error;
	}
};

// 좋아요 수 가져오기 API
export const getLikeCount = async (postingId) => {
	try {
		const response = await postApi.get(`/${postingId}/likes`);
		return response.data; // 좋아요 수 반환
	} catch (error) {
		console.error('Error fetching like count:', error);
		throw error;
	}
};
