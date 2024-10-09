import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';

const InviteMember = () => {
	const { groupId } = useParams();
	const memberId = localStorage.getItem('memberId');
	const [groupInfo, setGroupInfo] = useState();
	const [isAccepted, setIsAccepted] = useState(false); // 초대 수락 상태 관리

	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				console.log(groupId);
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				console.log(data);
				setGroupInfo(data);
			} catch (error) {
				console.log('Error fetching group info:', error);
			}
		};
		getGroupInfo();
	}, [groupId]);

	const handleClick = async () => {
		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}/participants`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify([
					{
						userId: parseInt(memberId),
					},
				]),
			});
			if (!response.ok) {
				console.log('전송은 했지만 발생한 에러', response);
			} else {
				setIsAccepted(true); // 초대 수락 성공 시 상태 업데이트
			}
		} catch (error) {
			console.log('전송에 실패한 에러', error);
		}
	};

	if (!memberId) {
		return (
			<div>
				<div>초대를 받으려면 로그인이 필요합니다.</div>
				<Link to={'/login'}>로그인 페이지로 이동</Link>
			</div>
		);
	} else {
		return (
			<div>
				<div>{groupInfo?.clubName}에서 초대를 받았습니다.</div>
				<button
					onClick={handleClick}
					disabled={isAccepted}
				>
					{isAccepted ? '초대를 수락하였습니다' : '초대 수락하기'}
				</button>
			</div>
		);
	}
};

export default InviteMember;
