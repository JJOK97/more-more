import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const accountApi = axios.create({
	baseURL: `${API_BASE_URL}/api/account`,
});

export const getAccountHistories = async (groupId, page = 1) => {
	const response = await accountApi.get(`/${groupId}/history`, {
		params: { page },
	});
	return response.data;
};

export default accountApi;
