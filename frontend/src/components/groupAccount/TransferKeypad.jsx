import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrow from '@/assets/img/account/arrow_left.svg';

const TransferKeypad = ({ setAmount, amount }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const groupId = location.pathname.match(/^\/group\/([^\/]+)\/account/)?.[1];

	const handleNumberClick = (value) => {
		setAmount((prevAmount) => {
			const newAmount = prevAmount + value;
			return newAmount.replace(/, /g, '');
		});
	};

	const handleDelete = () => {
		setAmount((amount) => amount.slice(0, -1).replace(/, /g, ''));
	};

	const handleSendClick = () => {
		console.log(`보낼 금액: ${amount}원`);
		if (groupId) {
			navigate(`/group/${groupId}/account/transfer-question`, { state: { amount } });
		}
	};

	const formattedAmount = amount ? `${Number(amount).toLocaleString()}원` : '0원';

	return (
		<div className="keypad-container">
			<div className="amount-display">
				<span>{formattedAmount}</span>
			</div>
			<div className="keypad">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
					<button
						key={number}
						className="number"
						onClick={() => handleNumberClick(number.toString())}
					>
						{number}
					</button>
				))}

				<button
					className="zerozero"
					onClick={() => handleNumberClick('00')}
				>
					00
				</button>
				<button
					className="zero"
					onClick={() => handleNumberClick('0')}
				>
					0
				</button>
				<button onClick={handleDelete}>
					<img
						src={arrow}
						alt="delete"
					/>
				</button>
			</div>
			<button
				className="send-button"
				onClick={handleSendClick}
			>
				보내기
			</button>
		</div>
	);
};

export default TransferKeypad;
