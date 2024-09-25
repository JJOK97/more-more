import React from 'react';
import data from './data.json';
import './Notice.css';
import invite from '/notice/invite1.svg';
import money from '/notice/money1.svg';
import docu from '/notice/docu1.svg';

const formatDate = (dateString) => {
	const noticeDate = new Date(dateString);
	const now = new Date();
	const diffInMs = now - noticeDate; // 현재 시간과 공지 시간 차이 (ms)
	const diffInHours = diffInMs / (1000 * 60 * 60); // 시간 차이로 변환
	const diffInMinutes = diffInMs / (1000 * 60); // 분 차이로 변환

	if (diffInHours < 1) {
		const minutesAgo = Math.floor(diffInMinutes);
		return `${minutesAgo}분 전`;
	} else if (diffInHours < 24) {
		const hoursAgo = Math.floor(diffInHours);
		return `${hoursAgo}시간 전`;
	} else {
		const month = noticeDate.getMonth() + 1; // 0-indexed
		const day = noticeDate.getDate();
		return `${month}월 ${day}일`;
	}
};

const Notice = () => {
	const datas = data.notice;

	return (
		<div className="notice-container">
			<div className="notice-list">
				{datas
					? datas.map((data) => (
							<div key={data.id} className={`notice-item`}>
								<div className="notice-header">
									<div className="notice-header-left">
										<img
											className="notice-icon"
											src={
												data.type === '멤버 초대'
													? invite
													: data.type === '회비 납부' || data.type === '결제'
													? money
													: data.type === '새 글' || data.type === '영수증 등록'
													? docu
													: ''
											}
											alt="icon"
										/>
										<div className="notice-type">{data.type}</div>
									</div>
									<div className="notice-date">{formatDate(data.date)}</div>
								</div>
								<div className="notice-item-content">{data.content}</div>
							</div>
					  ))
					: ''}
			</div>
		</div>
	);
};

export default Notice;
