import React, { useEffect, useState } from 'react';
import '@/assets/css/user/Profile.css';
import ProfileItem from './ProfileItem';
import usePageName from '../../store/usePageName';
import { getDatas } from '../feed/getData';
import { logoutUser } from '@/api/userAPI'; // 로그아웃 API 함수 가져오기

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
			setUserInfo(data);
		};
		getUserInfo();
	}, []);

	const formatUserInfo = (info) => [
		{ label: '이름', value: info.name },
		{ label: '전화번호', value: info.phoneNumber },
		{ label: '생일', value: info.birthDate },
		{ label: '이메일', value: info.email },
		{ label: '주소', value: info.address },
		{ label: '계좌', value: info.accountNumber },
	];

	// 로그아웃 버튼 클릭 시 처리
	const handleLogout = async () => {
		try {
			await logoutUser(); // 로그아웃 API 호출
			console.log('로그아웃 성공');
		} catch (error) {
			console.error('로그아웃 오류:', error);
		}
	};

	return (
		<div className="profile-container">
			<img
				className="profile-image-user"
				src={userInfo && userInfo.profileImageUrl}
				alt="프로필 이미지"
			/>
			<div className="profile-info">
				{userInfo &&
					formatUserInfo(userInfo).map((item, index) => (
						<ProfileItem
							key={index}
							label={item.label}
							value={item.value}
						/>
					))}
			</div>

			{/* 로그아웃 버튼 */}
			<div className="group-info-logout">
				<button
					className="profile-logout-button"
					onClick={handleLogout}
				>
					로그아웃
				</button>
			</div>
		</div>
	);
};

export default Profile;
