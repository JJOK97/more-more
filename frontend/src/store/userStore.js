import { create } from 'zustand';

export const useStore = create((set) => ({
	username: '',
	setUsername: (name) => set({ username: name }), // 사용자 이름을 설정하는 액션
}));
