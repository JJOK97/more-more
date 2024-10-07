import React, { useState, useEffect, useCallback } from 'react';
import DepositDetailOne from '@/components/groupAccount/DepositDetailOne';
import '@/assets/css/groupAccount/GroupAccount.css';
import { useParams } from 'react-router-dom';

const GroupAccountDepositList = ({ selectedDate }) => {
	const [accountHistories, setAccountHistories] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const { groupId } = useParams();

	// API 데이터를 불러오는 함수
	const fetchAccountHistories = useCallback(async (page) => {
		setLoading(true);
		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${groupId}/history`, {
				method: 'GET',
			});
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

	const filteredHistories = selectedDate
		? accountHistories.filter(
				(item) => new Date(item.date).toLocaleDateString() === selectedDate.toLocaleDateString(),
		  )
		: accountHistories;

	return (
		<div className="group-account-deposit-list-area">
			{accountHistories
				.slice()
				.reverse()
				.map((item, index) => (
					<DepositDetailOne
						key={index}
						id={item.id}
						place={item.place}
						price={item.price}
						date={item.date}
						time={item.time}
						balance={item.balance}
					/>
				))}
			{loading && <div>Loading...</div>}
		</div>
	);
};

export default GroupAccountDepositList;
