import React, { useEffect, useState } from 'react';
import data from './data.json';
import './Notice.css';
import NoticeItem from './NoticeItem';
import usePageName from '../../store/usePageName';

const Notice = () => {
	// 상태로 데이터를 관리합니다.
	const [notices, setNotices] = useState(data.notice);
	const { setPageName } = usePageName();

	useEffect(() => {
		setPageName('알림');
	}, [setPageName]);

	// 모두 읽음으로 표시하는 함수
	const markAllAsRead = () => {
		const updatedNotices = notices.map((notice) => ({
			...notice,
			isRead: true,
		}));
		setNotices(updatedNotices); // 상태 업데이트
	};

	return (
		<div className="notice-container">
			<button
				className='notice-all-read'
				onClick={markAllAsRead} // 버튼 클릭 시 함수 실행
			>
				모두 읽음으로 표시
			</button>
			<div className="notice-list">
				{notices
					? notices
							.slice() // 배열을 복사한 후
							.reverse() // 역순으로 정렬
							.map((data) => (
								<NoticeItem
									key={data.id}
									data={data}
								/> // NoticeItem 컴포넌트 사용
							))
					: ''}
			</div>
		</div>
	);
};

export default Notice;
