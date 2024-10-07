import React, { useEffect, useState } from 'react';
import '@/assets/css/user/Profile.css';
// import data from './data.json';
import ProfileItem from './ProfileItem';
import usePageName from '../../store/usePageName';
import { getDatas } from '../feed/getData';

const Profile = () => {
	const { setPageName } = usePageName();
	const [userInfo, setUserInfo] = useState();

	useEffect(() => {
		setPageName('프로필');
	}, [setPageName]);

	useEffect(() => {
		const getUserInfo = async () => {
			const memberId = localStorage.getItem('memberId');
			const url = `https://j11a605.p.ssafy.io/api/member/${memberId}`;
			const data = await getDatas(url);
			console.log(data);
			setUserInfo(data);
		};
		getUserInfo();
	}, []);

	return (
		<div className="profile-container">
			<img
				className="profile-image-user"
				src={userInfo && userInfo.profile.profileImageUrl}
				alt="프로필 이미지"
			/>
			<div className="profile-info">
				{userInfo && userInfo.profile.map((item, index) => (
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
