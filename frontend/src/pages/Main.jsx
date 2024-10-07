import React, { useEffect, useState } from 'react';
import '@/assets/css/common/Main.css';
import datas from '@/components/main/data.json';
import Group from '../components/main/Group';
import { Link } from 'react-router-dom';
import useGroupName from '@/store/useGroupName';
import { getDatas } from './feed/getData';

const Main = () => {
	const { setGroupName } = useGroupName();
	const groups = datas.groups;
	const [userInfo, setUserInfo] = useState();
	const [allGroups, setAllGroups] = useState([]);

	useEffect(() => {
		setGroupName('');
	}, []);

	useEffect(() => {
		const getUserInfo = async () => {
			const memberId = localStorage.getItem('memberId');
			const url = `https://j11a605.p.ssafy.io/api/member/${memberId}`;
			const data = await getDatas(url);
			setUserInfo(data);
		};
		getUserInfo();
	}, []);

	useEffect(() => {
		const getAllGroups = async () => {
			const memberId = localStorage.getItem('memberId');
			const url = `https://j11a605.p.ssafy.io/api/club?memberId=${memberId}`;
			const data = await getDatas(url);
			setAllGroups(data);
			console.log(data);
		};
		getAllGroups();
	}, []);

	return (
		<div className="main-container">
			<div className="main-profile-area">
				<div className="main-profile-title">내 정보</div>
				<Link
					to={'/profile'}
					className="main-profile-data"
				>
					<img
						className="main-profile-image"
						src={userInfo && userInfo.profileImageUrl}
						alt="프로필 이미지"
					/>
					<div className="main-profile-info">
						<div className="main-profile-name">{userInfo && userInfo.name}님</div>
						<div className="main-profile-bank-info">
							<img
								className="main-bank-logo"
								src="/main/BNK.png"
								alt="은행로고"
							/>
							<div className="main-bank-name">경남</div>
							<div className="main-account-number">{userInfo && userInfo.accountNumber}</div>
						</div>
						{/* <div className="main-profile-balance">394,227원</div> */}
					</div>
				</Link>
			</div>
			<div className="main-groups-area">
				<div className="main-groups-title">내 모임</div>
				<div className="main-groups-list">
					{allGroups ? (
						allGroups.map((group) => (
							<Group
								key={group.clubId}
								group={group}
							/>
						))
					) : (
						<div className="main-no-groups-message">모임이 없습니다.</div>
					)}
					<Link
						className="main-group-create-area"
						to={'/create'}
					>
						<img
							className="main-create-icon"
							src="/main/Plus circle.svg"
						/>
						<div className="main-create-title">새로운 모임 만들기</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Main;
