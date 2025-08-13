import React, { useState, useEffect, useCallback } from 'react';
import DepositDetailOne from '@/components/groupAccount/DepositDetailOne';
import '@/assets/css/groupAccount/GroupAccount.css';
import { useParams } from 'react-router-dom';
import { getAccountHistories } from '@/api/accountAPI';
import moment from 'moment';

const GroupAccountDepositList = ({ selectedDate, searchTerm, onTagClick, onClose }) => {
	const [accountHistories, setAccountHistories] = useState([]);
	const [loading, setLoading] = useState(false);
	const { groupId } = useParams();

	// API 호출을 통해 데이터를 가져오는 함수
	const fetchAccountHistories = useCallback(async () => {
		setLoading(true);
		try {
			// 테스트 그룹인지 확인
			if (groupId.startsWith('TEST')) {
				// 테스트 그룹의 경우 샘플 거래 내역 설정
				const sampleData = [
					{
						accountHistoryId: 1,
						paymentData: '회비 납부 - 김철수',
						paymentAmount: 50000,
						accountDate: '20250623',
						accountTime: (() => {
							const now = new Date();
							const past = new Date(now.getTime() - 24 * 60 * 1000); // 24분 전
							return (
								past.getHours().toString().padStart(2, '0') +
								past.getMinutes().toString().padStart(2, '0') +
								past.getSeconds().toString().padStart(2, '0')
							);
						})(),
						accountBalance: 150000,
						paymentType: 'DEPOSIT',
						tagName: '회비',
					},
					{
						accountHistoryId: 2,
						paymentData: '회식비 결제',
						paymentAmount: -80000,
						accountDate: '20250623',
						accountTime: (() => {
							const now = new Date();
							const past = new Date(now.getTime() - 294 * 60 * 1000); // 294분 전
							return (
								past.getHours().toString().padStart(2, '0') +
								past.getMinutes().toString().padStart(2, '0') +
								past.getSeconds().toString().padStart(2, '0')
							);
						})(),
						accountBalance: 70000,
						paymentType: 'WITHDRAWAL',
						tagName: '회식',
					},
					{
						accountHistoryId: 3,
						paymentData: '회비 납부 - 이영희',
						paymentAmount: 50000,
						accountDate: '20250320',
						accountTime: '100000',
						accountBalance: 100000,
						paymentType: 'DEPOSIT',
						tagName: '회비',
					},
					{
						accountHistoryId: 4,
						paymentData: '카페 모임비',
						paymentAmount: -25000,
						accountDate: '20250315',
						accountTime: '153000',
						accountBalance: 75000,
						paymentType: 'WITHDRAWAL',
						tagName: '모임',
					},
					{
						accountHistoryId: 5,
						paymentData: '회비 납부 - 박민수',
						paymentAmount: 50000,
						accountDate: '20250410',
						accountTime: '094500',
						accountBalance: 125000,
						paymentType: 'DEPOSIT',
						tagName: '회비',
					},
					{
						accountHistoryId: 6,
						paymentData: '영화관람 단체할인',
						paymentAmount: -45000,
						accountDate: '20250412',
						accountTime: '160000',
						accountBalance: 80000,
						paymentType: 'WITHDRAWAL',
						tagName: '문화',
					},
					{
						accountHistoryId: 7,
						paymentData: '회비 납부 - 최지연',
						paymentAmount: 50000,
						accountDate: '20250505',
						accountTime: '113000',
						accountBalance: 130000,
						paymentType: 'DEPOSIT',
						tagName: '회비',
					},
					{
						accountHistoryId: 8,
						paymentData: '야구장 관람',
						paymentAmount: -60000,
						accountDate: '20250510',
						accountTime: '140000',
						accountBalance: 70000,
						paymentType: 'WITHDRAWAL',
						tagName: '스포츠',
					},
					{
						accountHistoryId: 9,
						paymentData: '회비 납부 - 정우진',
						paymentAmount: 50000,
						accountDate: '20250615',
						accountTime: '091500',
						accountBalance: 120000,
						paymentType: 'DEPOSIT',
						tagName: '회비',
					},
					{
						accountHistoryId: 10,
						paymentData: '바베큐 파티',
						paymentAmount: -85000,
						accountDate: '20250618',
						accountTime: '183000',
						accountBalance: 35000,
						paymentType: 'WITHDRAWAL',
						tagName: '파티',
					},
				];
				setAccountHistories(sampleData);
				return;
			}

			const data = await getAccountHistories(groupId);
			setAccountHistories(data); // 받아온 데이터를 설정
		} catch (e) {
			console.error('Error fetching account history:', e);
			setAccountHistories([]); // 오류 발생 시 빈 배열로 설정
		} finally {
			setLoading(false);
		}
	}, [groupId]);

	// 컴포넌트가 마운트될 때 데이터 로드
	useEffect(() => {
		fetchAccountHistories();
	}, [fetchAccountHistories]);

	const checkVerification = async (tagName) => {
		// 테스트 그룹인지 확인
		if (groupId.startsWith('TEST')) {
			console.log(`Test group - skipping verification check for ${tagName}`);
			return;
		}

		try {
			console.log('여기 tagName: ', tagName);
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${tagName}/isverificationin`, {
				method: 'POST',
			});
			if (response.ok) {
				console.log(`Verification check for ${tagName} was successful`);
			} else {
				console.error(`Verification check for ${tagName} failed. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error during verification check for ${tagName}: `, error);
		}
	};

	// 날짜 및 검색어에 맞게 거래 내역 필터링 (selectedDate가 있을 때만 필터링)
	const filteredHistories = (accountHistories || [])
		.filter((item) => {
			if (selectedDate) {
				const itemDate = moment(item.accountDate, 'YYYYMMDD').format('YYYY-MM-DD');
				const selectedDateFormatted = moment(selectedDate).format('YYYY-MM-DD');
				return itemDate === selectedDateFormatted; // 날짜 비교
			}
			return true; // selectedDate가 없으면 필터링하지 않음
		})
		.filter((item) => (searchTerm ? item.paymentData.toLowerCase().includes(searchTerm.toLowerCase()) : true));

	return (
		<div className="group-account-deposit-list-area">
			{filteredHistories.length === 0 && !loading && (
				<div className="none-text-area">해당 날짜에 거래 내역이 없습니다.</div>
			)}
			{filteredHistories.map((item, index) => (
				<div
					className="deposit-container"
					key={index}
					onClick={() => {
						console.log('Tag clicked in GroupAccountDepositList: ', item.tagName);
						if (onTagClick) {
							onTagClick(item.tagName);
						}
						if (onClose) {
							onClose();
						}
						checkVerification(item.tagName);
					}}
				>
					<DepositDetailOne
						id={item.accountHistoryId}
						paymentData={item.paymentData}
						paymentAmount={item.paymentAmount}
						date={item.accountDate}
						time={item.accountTime}
						balance={item.accountBalance}
						paymentType={item.paymentType}
						searchTerm={searchTerm}
						tagName={item.tagName}
					/>
				</div>
			))}

			{loading && <div>Loading...</div>}
		</div>
	);
};

export default GroupAccountDepositList;
