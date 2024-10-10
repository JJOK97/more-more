import { create } from 'zustand';

const useTagNameStore = create((set) => ({
	tagName: '',
	setTagName: (tagName) => set({ tagName }),
}));

export default useTagNameStore;
