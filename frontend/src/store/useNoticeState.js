import { create } from 'zustand';

const useNoticeState = create((set) => ({
	isUnreadNotice: false,
	setIsUnreadNotice: (state) => set(() => ({ isUnreadNotice: state })),
}));

export default useNoticeState;
