import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const commentApi = axios.create({
	baseURL: `${API_BASE_URL}/api/posting`,
});

// 댓글 생성 API 호출
export const createComment = async (postingId, memberId, commentContent) => {
	try {
		const response = await commentApi.post(`/${postingId}/comment`, {
			postingId,
			memberId,
			commentContent,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating comment:', error);
		throw error;
	}
};

// 댓글 조회 API 호출
export const getComments = async (postingId) => {
	try {
		const response = await commentApi.get(`/${postingId}/comment`);
		return response.data;
	} catch (error) {
		console.error('Error fetching comments:', error);
		throw error;
	}
};

// 댓글 수정 API 호출
export const updateComment = async (commentId, commentContent) => {
	try {
		const response = await commentApi.put(`/comment/${commentId}`, {
			commentId,
			commentContent,
		});
		return response.data;
	} catch (error) {
		console.error('Error updating comment:', error);
		throw error;
	}
};

// 댓글 삭제 API 호출
export const deleteComment = async (commentId) => {
	try {
		const response = await commentApi.delete(`/comment/${commentId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting comment:', error);
		throw error;
	}
};
