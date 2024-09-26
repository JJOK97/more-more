import { create } from 'zustand';

const useGroupName = create((set) => ({
	groupName: '',
	setGroupName: (name) => set({ groupName: name }),
}));

export default useGroupName;
