import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const scheduleApi = axios.create({
	baseURL: `${API_BASE_URL}/api/schedule`,
});

export const getAllSchedules = (clubCode) => {
	return scheduleApi
		.get(`/${clubCode}/all`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const createSchedule = (scheduleData) => {
	return scheduleApi.post('', scheduleData);
};

export const updateSchedule = (clubCode, scheduleId, scheduleData) => {
	return scheduleApi.put(`/${clubCode}/${scheduleId}`, scheduleData);
};

export const deleteSchedule = (clubCode, scheduleId) => {
	return scheduleApi.delete(`/${clubCode}/${scheduleId}`);
};

export const getMonthlySchedules = (clubCode, yearMonth) => {
	return scheduleApi
		.get(`/${clubCode}/${yearMonth}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const getDailySchedules = (clubCode, date) => {
	return scheduleApi
		.get(`/${clubCode}/${date}/daySchedule`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export default scheduleApi;
