import React, { useState, useEffect, useCallback } from 'react';
import DepositDetailOne from '@/components/groupAccount/DepositDetailOne';
import '@/assets/css/groupAccount/GroupAccount.css';
import { useParams } from 'react-router-dom';
import { getAccountHistories } from '@/api/accountAPI'; // API 호출 함수 임포트

const GroupAccountDepositList = ({ selectedDate, searchTerm }) => {
	const [accountHistories, setAccountHistories] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const { groupId } = useParams();

	const fetchAccountHistories = useCallback(
		async (page) => {
			setLoading(true);
			try {
				const data = await getAccountHistories(groupId, page); // Axios API 호출
				setAccountHistories((prev) => [...prev, ...data]);
				setHasMore(data.length > 0); // 데이터가 없으면 더 불러오지 않음
			} catch (e) {
				console.error('Error fetching account history:', e);
			} finally {
				setLoading(false);
			}
		},
		[groupId],
	);

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.scrollHeight - 100
			) {
				loadMore(); // 스크롤이 하단에 가까워지면 더 로드
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loading, hasMore]);

	// 페이지가 변경될 때마다 데이터 로드
	useEffect(() => {
		fetchAccountHistories(page);
	}, [page, fetchAccountHistories]);

	// 필터링 로직 수정
	const filteredHistories = accountHistories
		.filter((item) =>
			selectedDate ? new Date(item.accountDate).toLocaleDateString() === selectedDate.toLocaleDateString() : true,
		)
		.filter((item) => (searchTerm ? item.paymentData.toLowerCase().includes(searchTerm.toLowerCase()) : true));

	return (
		<div className="group-account-deposit-list-area">
			{filteredHistories.length === 0 && !loading && <div>해당 날짜에 거래 내역이 없습니다.</div>}
			{filteredHistories
				.slice()
				.reverse()
				.map((item, index) => (
					<DepositDetailOne
						key={index}
						id={item.accountHistoryId}
						paymentData={item.paymentData} // place 대신 paymentData 전달
						paymentAmount={item.paymentAmount} // 금액 전달
						date={item.accountDate}
						time={item.accountTime}
						balance={item.accountBalance}
						paymentType={item.paymentType} // 출금/입금 여부 전달
						searchTerm={searchTerm}
					/>
				))}
			{loading && <div>Loading...</div>}
		</div>
	);
};

export default GroupAccountDepositList;
