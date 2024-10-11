import { create } from 'zustand';

const useGroupStore = create((set) => ({
	clubCode: null, // clubCode 저장
	createdDate: null, // createdDate 저장
	dues: null, // dues 저장
	setClubCode: (code) => set({ clubCode: code }), // clubCode 업데이트 함수
	setCreatedDate: (date) => set({ createdDate: date }), // createdDate 업데이트 함수
	setDues: (amount) => set({ dues: amount }), // dues 업데이트 함수
}));

export default useGroupStore;
