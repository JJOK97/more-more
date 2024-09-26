import React, { useEffect } from 'react';
import data from './data.json';
import './Notice.css';
import NoticeItem from './NoticeItem'; // NoticeItem을 가져옵니다.
import usePageName from '../../store/usePageName';

const Notice = () => {
	const datas = data.notice;
	const { setPageName } = usePageName();
	useEffect(() => {
		setPageName('알림');
	}, [setPageName]);

	return (
		<div className="notice-container">
			<div className="notice-list">
				{datas
					? datas
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
