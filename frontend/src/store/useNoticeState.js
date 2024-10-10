import { create } from 'zustand';

const useNoticeState = create((set) => ({
	isUnreadNotice: true, // 읽지 않은 알림이 있는지 확인하는 상태
	setIsUnreadNotice: (isUnread) => set({ isUnreadNotice: isUnread }), // boolean 값으로 업데이트
}));

export default useNoticeState;
