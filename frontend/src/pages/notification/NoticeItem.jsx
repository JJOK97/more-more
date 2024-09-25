import React from 'react';
import invite from '/notice/invite1.svg';
import money from '/notice/money1.svg';
import docu from '/notice/docu1.svg';

const formatDate = (dateString) => {
	const noticeDate = new Date(dateString);
	const now = new Date();
	const diffInMs = now - noticeDate; 
	const diffInHours = diffInMs / (1000 * 60 * 60);
	const diffInMinutes = diffInMs / (1000 * 60);

	if (diffInHours < 1) {
		return `${Math.floor(diffInMinutes)}분 전`;
	} else if (diffInHours < 24) {
		return `${Math.floor(diffInHours)}시간 전`;
	} else {
		const month = noticeDate.getMonth() + 1;
		const day = noticeDate.getDate();
		return `${month}월 ${day}일`;
	}
};

const NoticeItem = ({ data }) => {
	const { type, date, content } = data;

	return (
		<div className="notice-item">
			<div className="notice-header">
				<div className="notice-header-left">
					<img
						className="notice-icon"
						src={
							type === '멤버 초대'
								? invite
								: type === '회비 납부' || type === '결제'
								? money
								: type === '새 글' || type === '영수증 등록'
								? docu
								: ''
						}
						alt="icon"
					/>
					<div className="notice-type">{type}</div>
				</div>
				<div className="notice-date">{formatDate(date)}</div>
			</div>
			<div className="notice-item-content">{content}</div>
		</div>
	);
};

export default NoticeItem;
