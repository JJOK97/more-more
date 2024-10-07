import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DepositDetailOne = ({ id, place, price, time, balance }) => {
	const location = useLocation(); // 현재 경로 가져오기

	const handleClick = () => {
		if (location.pathname.includes('/group') && location.pathname.includes('/create')) {
			// '/group/:groupId/create' 페이지인 경우, place와 time을 리턴
			alert(`${place} ${time}`);
		}
	};

	return (
		<div
			className="deposit-detail-one"
			onClick={handleClick}
		>
			{location.pathname.includes('/group') && location.pathname.includes('/create') ? (
				// '/group/:groupId/create' 페이지에서는 alert로 출력
				<div className='deposit-detail-container'>
					<div className="deposit-list-place-price">
						<div className="deposit-list-place">{place}</div>
						<div className={`deposit-list-price ${price.startsWith('+') ? 'plus' : ''}`}>{price}</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{time}</div>
						<div className="deposit-list-balance">{balance}</div>
					</div>
				</div>
			) : (
				// 그 외의 경우 Link로 동작
				<Link className='deposit-detail-container' to={`/group/${id}/details`}>
					<div className="deposit-list-place-price">
						<div className="deposit-list-place">{place}</div>
						<div className={`deposit-list-price ${price.startsWith('+') ? 'plus' : ''}`}>{price}</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{time}</div>
						<div className="deposit-list-balance">{balance}</div>
					</div>
				</Link>
			)}
		</div>
	);
};

export default DepositDetailOne;
