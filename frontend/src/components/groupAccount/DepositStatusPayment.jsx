import React from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import arrow from '@/assets/img/account/arrow_down.svg';

const DepositStatusPayment = ({ dueDate }) => {
	return (
		<div>
			<div className="filter-date">
				2024년 9월 <img src={arrow} />
			</div>
			<div className="deposit-payment-status">
				<div className="dues-payment">
					🎉 박지환님은 9월 회비를 <span>납부</span>하셨어요! 🎉
				</div>
				<div className="dues-payment-info">
					<li>
						<span className="payment-date">매월 1일</span>이 납입일이에요.
					</li>
					<li>
						이번 달에는 <span className="payment-this-month">100,000원</span>을 납부하셨어요.
					</li>
				</div>
			</div>
		</div>
	);
};

export default DepositStatusPayment;
