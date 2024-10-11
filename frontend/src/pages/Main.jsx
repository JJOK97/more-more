import React, { useEffect, useState } from 'react';
import '@/assets/css/common/Main.css';
import datas from '@/components/main/data.json';
import Group from '../components/main/Group';
import { Link, useNavigate } from 'react-router-dom';
import useGroupName from '@/store/useGroupName';
import { getDatas } from './feed/getData';

import NHBank from '@/assets/img/bank/NHBank.svg';
import KBBank from '@/assets/img/bank/KBBank.svg';
import ShinhanBank from '@/assets/img/bank/ShinhanBank.svg';
import WooriBank from '@/assets/img/bank/WooriBank.svg';
import IBKBank from '@/assets/img/bank/IBKBank.svg';
import HanaBank from '@/assets/img/bank/HanaBank.svg';

const Main = () => {
	const { setGroupName } = useGroupName();
	const groups = datas.groups;
	const [userInfo, setUserInfo] = useState();
	const [allGroups, setAllGroups] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setGroupName('');
	}, []);

	useEffect(() => {
		const getUserInfo = async () => {
			const memberId = localStorage.getItem('memberId');
			if (!memberId) {
				navigate('/login'); // 로그인 페이지로 이동
				return; // 함수 종료
			} else {
				const url = `https://j11a605.p.ssafy.io/api/member/${memberId}`;
				const data = await getDatas(url);
				setUserInfo(data);
			}
		};
		getUserInfo();
	}, []);

	useEffect(() => {
		const getAllGroups = async () => {
			const memberId = localStorage.getItem('memberId');
			// memberId가 null이면 '/login'으로 리다이렉트
			if (!memberId) {
				navigate('/login'); // 로그인 페이지로 이동
				return; // 함수 종료
			} else {
				const url = `https://j11a605.p.ssafy.io/api/club?memberId=${memberId}`;
				const data = await getDatas(url);
				setAllGroups(data);
			}
		};

		getAllGroups();
	}, [navigate]); // navigate를 의존성 배열에 추가

	// userInfo.bank에 따라 은행 로고를 설정하는 함수
	const getBankLogo = (bank) => {
		switch (bank) {
			case '농협':
				return NHBank;
			case '국민':
				return KBBank;
			case '신한':
				return ShinhanBank;
			case '우리':
				return WooriBank;
			case '기업':
				return IBKBank;
			case '하나':
				return HanaBank;
			default:
				return '/main/DefaultBank.svg'; // 기본 로고 설정
		}
	};

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
								src={userInfo && getBankLogo(userInfo.bank)}
								alt="은행 로고"
							/>
							<div className="main-bank-name">{userInfo?.bank}</div>
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
							alt="새 모임 만들기"
						/>
						<div className="main-create-title">새로운 모임 만들기</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Main;
