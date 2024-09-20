import React, { useState, useEffect } from 'react';

import LoadingPage from '@/components/common/LodingPage';

import '@/assets/css/common/Main.css';

import datas from '@/components/main/data.json';
import Group from '@/components/main/Group';

const Main = () => {
	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState([]);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setGroups(datas.groups);
			setFadeOut(true);
			setTimeout(() => {
				setLoading(false);
			}, 100); // LoadingPage가 사라지는 데 걸리는 시간
		}, 1000); // 데이터 로딩을 시뮬레이션하는 시간
	}, []);

	return (
		<>
			{loading && <LoadingPage fadeOut={fadeOut} />}
			<div className={`main-container ${!loading ? 'fade-in' : ''}`}>
				<div className="main-profile-area">
					<div className="main-profile-title">내 정보</div>
					<div className="main-profile-data">
						<img
							className="main-profile-image"
							src="/feed/profile_icon2.png"
							alt="프로필 이미지"
						/>
						<div className="main-profile-info">
							<div className="main-profile-name">옥진석님</div>
							<div className="main-profile-bank-info">
								<img
									className="main-bank-logo"
									src="/main/BNK.png"
									alt="은행로고"
								/>
								<div className="main-bank-name">경남</div>
								<div className="main-account-number">578-21-0227054</div>
							</div>
							<div className="main-profile-balance">394,227원</div>
						</div>
					</div>
				</div>
				<div className="main-groups-area">
					<div className="main-groups-title">내 그룹</div>
					<div className="main-groups-list">
						{groups.length > 0 ? (
							groups.map((group) => (
								<Group
									key={group.groupId}
									group={group}
								/>
							))
						) : (
							<div className="main-no-groups-message">그룹이 없습니다.</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
