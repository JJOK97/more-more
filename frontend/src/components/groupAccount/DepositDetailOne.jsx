import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const DepositDetailOne = ({ id, place, price, date, time, balance, searchTerm }) => {
	const location = useLocation(); // 현재 경로 가져오기
	const { groupId } = useParams();

	// 시간을 변환하는 함수
	const formatTime = () => {
		const currentDate = new Date();
		const depositDate = new Date(`${date}T${time}`);
		const diffInMilliseconds = currentDate - depositDate;
		const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);

		if (diffInMinutes < 60) {
			// 1시간 이내
			return `${diffInMinutes}분 전`;
		} else if (diffInHours < 24) {
			// 24시간 이내
			return `${diffInHours}시간 전`;
		} else {
			// 그보다 이전
			const depositMonth = depositDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
			const depositDay = depositDate.getDate();
			const depositHour = depositDate.getHours();
			const depositMinute = depositDate.getMinutes();
			return `${depositMonth}월 ${depositDay}일`;
		}
	};

	const handleClick = () => {
		if (location.pathname.includes('/group') && location.pathname.includes('/create')) {
			// '/group/:groupId/create' 페이지인 경우, place와 time을 리턴
			alert(`${place} ${time}`);
		}
	};

	const highlightText = (text, searchTerm) => {
		if (!searchTerm) return text;
		const regex = new RegExp(`(${searchTerm})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, index) =>
			regex.test(part) ? (
				<span
					key={index}
					style={{ backgroundColor: 'yellow' }}
				>
					{part}
				</span>
			) : (
				part
			),
		);
	};

	return (
		<div
			className="deposit-detail-one"
			onClick={handleClick}
		>
			{location.pathname.includes('/group') && location.pathname.includes('/create') ? (
				// '/group/:groupId/create' 페이지에서는 alert로 출력
				<div className="deposit-detail-container">
					<div className="deposit-list-place-price">
						<div className="deposit-list-place"> {highlightText(place, searchTerm)}</div>
						<div className={`deposit-list-price ${price.startsWith('+') ? 'plus' : ''}`}>{price}</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{formatTime()}</div>
						<div className="deposit-list-balance">{balance}</div>
					</div>
				</div>
			) : (
				// 그 외의 경우 Link로 동작
				<Link
					className="deposit-detail-container"
					to={`/group/${groupId}/account/${id}`}
				>
					<div className="deposit-list-place-price">
						<div className="deposit-list-place"> {place} </div>
						<div className={`deposit-list-price ${price.startsWith('+') ? 'plus' : ''}`}>{price}</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{formatTime()}</div>
						<div className="deposit-list-balance">{balance}</div>
					</div>
				</Link>
			)}
		</div>
	);
};

export default DepositDetailOne;
