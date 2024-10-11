import React, { useState, useEffect } from 'react';
import '@/assets/css/groupAccount/ProgressBar.css';
import checkOn from '@/assets/img/account/check-on.svg';
import checkOff from '@/assets/img/account/check-off.svg';
import { useParams } from 'react-router-dom';
import { getMemberInfo } from '@/api/userAPI';
import { getAccountCompareDate } from '@/api/accountAPI';
import useGroupStore from '@/store/useGroupStore';

const DuesGroupMemberStatus = ({ selectedDate }) => {
	const { groupId } = useParams();
	const [members, setMembers] = useState([]);
	const [completedPercentage, setCompletedPercentage] = useState(0);
	const { clubCode } = useGroupStore();
	const [dues, setDues] = useState(0);
	const [totalCollected, setTotalCollected] = useState(0);

	// 숫자 포맷팅 함수 (천 단위로 콤마 추가)
	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('ko-KR').format(amount);
	};

	useEffect(() => {
		const getGroupMemberStatus = async () => {
			if (!clubCode || !selectedDate.yyyymm) {
				return;
			}
			try {
				// 납부한 회원 이름 목록 가져오기
				const paidMemberNames = await getAccountCompareDate(clubCode, selectedDate.yyyymm);
				console.log('Paid member names:', paidMemberNames);

				// 모임의 참가자 목록 가져오기
				const response = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}`);
				const data = await response.json();
				console.log('Group data:', data);

				// dues 설정
				setDues(data.dues);

				// 회원 정보 업데이트 및 납부 상태 확인
				const updatedMembers = await Promise.all(
					data.participants.map(async (participant) => {
						try {
							const memberInfo = await getMemberInfo(participant.userId);
							const memberName = memberInfo.name;
							const isPaid = paidMemberNames.includes(memberName);
							console.log(`Member ${memberName} isPaid:`, isPaid);
							return {
								name: memberName,
								isPaid: isPaid,
							};
						} catch (error) {
							console.error('Error fetching member info:', error);
							return {
								name: 'Unknown',
								isPaid: false,
							};
						}
					}),
				);
				setMembers(updatedMembers);
				console.log('Updated members:', updatedMembers);
			} catch (error) {
				console.error('Error fetching group member status:', error);
			}
		};
		getGroupMemberStatus();
	}, [groupId, clubCode, selectedDate]);

	// 납부 완료 퍼센트 계산 및 총 수집된 금액 계산
	useEffect(() => {
		if (members.length > 0) {
			const paidMembersCount = members.filter((member) => member.isPaid).length;
			const percentage = Math.round((paidMembersCount / members.length) * 100);
			setCompletedPercentage(percentage);

			// 총 수집된 금액 계산
			const totalCollectedAmount = dues * paidMembersCount;
			setTotalCollected(totalCollectedAmount);
		}
	}, [members, dues]);

	return (
		<div className="dues-group-member-status">
			<div>모임원 납부 현황</div>
			<div className="dues-member-gather-count">
				<div className="dues-people-count">
					{members.filter((member) => member.isPaid).length} / {members.length} 명 완료
				</div>
				<div>
					<span className="dues-gather">{formatCurrency(totalCollected)}원 </span>모임
				</div>
			</div>
			<div className="progress-bar">
				<div className="wrapper">
					<div className="container">
						<div
							className="completedBar"
							style={{ width: `${completedPercentage}%` }}
						>
							<span className="label">{`${completedPercentage}%`}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="dues-member-list">
				{members.map((member, index) => {
					console.log(`Rendering member ${member.name}, isPaid:`, member.isPaid);
					return (
						<div
							className="dues-one-member"
							key={member.name}
						>
							<img
								src={member.isPaid ? checkOn : checkOff}
								alt={member.isPaid ? '납부 완료' : '납부 미완료'}
								className="checkbox-Img"
							/>
							<label>{member.name}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default DuesGroupMemberStatus;
