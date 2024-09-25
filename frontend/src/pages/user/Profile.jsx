import React, { useEffect } from 'react';
import '@/assets/css/user/Profile.css';
import data from './data.json';
import ProfileItem from './ProfileItem';
import usePageName from '../../store/usePageName';

const Profile = () => {
	const { setPageName } = usePageName();

	useEffect(() => {
		setPageName('프로필');
	}, [setPageName]);

	return (
		<div className="profile-container">
			<img
				className="profile-image-user"
				src="/user/profile_man.jpg"
				alt="프로필 이미지"
			/>
			<div className="profile-info">
				{data.profile.map((item, index) => (
					<ProfileItem
						key={index} // 고유 key
						label={item.label}
						value={item.value}
					/>
				))}
			</div>
			<button className="profile-edit-button">프로필 수정하기</button>
		</div>
	);
};

export default Profile;
