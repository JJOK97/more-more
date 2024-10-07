import React, { useState, useEffect, useCallback } from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';

const GroupAccountDepositList = () => {
	const [accountHistories, setAccountHistories] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// API 데이터를 불러오는 함수
	const fetchAccountHistories = useCallback(async (page) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/group/account/history?page=${page}`);
			const data = await response.json();

			setAccountHistories((prev) => [...prev, ...data]);
			setHasMore(data.length > 0); // 데이터가 없으면 더 불러오지 않음
		} catch (e) {
			console.error('Error fetching account history:', e);
		} finally {
			setLoading(false);
		}
	}, []);

	// 무한 스크롤 로딩 함수
	const loadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
	};

	// 스크롤 이벤트 처리
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

	return (
		<div className="group-account-deposit-list-area">
			{accountHistories.length > 0 ? (
				accountHistories.map((history) => (
					<div
						key={history.accountHistoryId}
						className="deposit-detail-one"
					>
						<div className="deposit-list-place-price">
							<div className="deposit-list-place">{history.tagName}</div>
							<div className={`deposit-list-price ${history.paymentType === 'IN' ? 'plus' : ''}`}>
								{history.paymentType === 'IN'
									? `+${history.paymentAmount}원`
									: `-${history.paymentAmount}원`}
							</div>
						</div>
						<div className="deposit-list-time-balance">
							<div className="deposit-list-time">{history.accountTime}</div>
							<div className="deposit-list-balance">{history.accountBalance}원</div>
						</div>
					</div>
				))
			) : (
				<div>데이터가 없습니다.</div>
			)}

			{loading && <div>Loading...</div>}
		</div>
	);
};

export default GroupAccountDepositList;
