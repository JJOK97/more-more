import { create } from 'zustand';

export const useTagNameStore = create((set) => ({
	tagName: '',
	setTagName: (tagName) => set({ tagName }),
}));
