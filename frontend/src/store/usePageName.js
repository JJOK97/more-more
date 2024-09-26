import { create } from 'zustand';

const usePageName = create((set) => ({
	usePageName: '',
	setPageName: (name) => set({ pageName: name }),
}));

export default usePageName;
