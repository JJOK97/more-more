import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const accountApi = axios.create({
	baseURL: `${API_BASE_URL}/api/account`,
});

export const getAccountHistories = async (groupId) => {
	const response = await accountApi.get(`/${groupId}/history`);
	return response.data;
};

export const getAccountHistoriesByMonth = async (clubCode, date) => {
	const response = await accountApi.get(`/${clubCode}/${date}/historybydate`);
	return response.data;
};

export const getAccountCompareDate = async (clubCode, date) => {
	const response = await accountApi.get(`/${clubCode}/${date}/comparedate`);
	return response.data;
};

export default accountApi;
