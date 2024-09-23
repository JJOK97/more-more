import React, { useEffect } from 'react';
import { useStore } from '@/store/userStore';
import useGroupName from '@/store/useGroupName';

const Profile = () => {
	const username = useStore((state) => state.username);
	const { setGroupName } = useGroupName();
	useEffect(() => {
		setGroupName('');
	}, []);

	return (
		<div className="profile-page">
			<h1>Profile Page</h1>
			<p>Username: {username}</p>
		</div>
	);
};

export default Profile;
