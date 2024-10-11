import React, { useState, useEffect, useCallback } from 'react';
import DepositDetailOne from '@/components/groupAccount/DepositDetailOne';
import '@/assets/css/groupAccount/GroupAccount.css';
import { useParams } from 'react-router-dom';
import { getAccountHistories } from '@/api/accountAPI';
import moment from 'moment';

const GroupAccountDepositList = ({ selectedDate, searchTerm, onTagClick, onClose }) => {
	console.log('GroupAccountDepositList - onTagClick: ', onTagClick); // 로그 추가
	console.log('GroupAccountDepositList - onClose: ', onClose); // 로그 추가
	const [accountHistories, setAccountHistories] = useState([]);
	const [loading, setLoading] = useState(false);
	const { groupId } = useParams();

	// API 호출을 통해 데이터를 가져오는 함수
	const fetchAccountHistories = useCallback(async () => {
		setLoading(true);
		try {
			const data = await getAccountHistories(groupId);
			setAccountHistories(data); // 받아온 데이터를 설정
		} catch (e) {
			console.error('Error fetching account history:', e);
		} finally {
			setLoading(false);
		}
	}, [groupId]);

	// 컴포넌트가 마운트될 때 데이터 로드
	useEffect(() => {
		fetchAccountHistories();
	}, [fetchAccountHistories]);

	const checkVerification = async (tagName) => {
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
	const filteredHistories = accountHistories
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
			{filteredHistories.length === 0 && !loading && <div>해당 날짜에 거래 내역이 없습니다.</div>}
			{filteredHistories.map((item, index) => (
				<DepositDetailOne
					key={index}
					id={item.accountHistoryId}
					paymentData={item.paymentData}
					paymentAmount={item.paymentAmount}
					date={item.accountDate}
					time={item.accountTime}
					balance={item.accountBalance}
					paymentType={item.paymentType}
					searchTerm={searchTerm} // 검색어 전달
					tagName={item.tagName}
					onClick={() => {
						console.log('Tag clicked in GroupAccountDepositList: ', item.tagName);
						console.log('onTagClick:', onTagClick);
						console.log('onClose:', onClose);
						onTagClick(item.tagName);
						console.log('Tag clicked after onTagClick');
						onClose();
						console.log('Tag clicked before checkVerification');
						checkVerification(item.tagName);
					}}
				/>
			))}
			{loading && <div>Loading...</div>}
		</div>
	);
};

export default GroupAccountDepositList;
