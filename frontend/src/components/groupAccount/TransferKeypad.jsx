import React, { useState } from 'react';
import arrow from '@/assets/img/account/arrow_left.svg';

const TransferKeypad = () => {
	const [amount, setAmount] = useState('');

	const handleNumberClick = (value) => {
		setAmount(amount + value);
	};

	const handleDelete = () => {
		setAmount(amount.slice(0, -1));
	};

	const handleClear = () => {
		setAmount('');
	};

	return (
		<div className="keypad-container">
			<div className="amount-display">
				<span>{amount ? `${Number(amount).toLocaleString()}원` : '0원'}</span>
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
					<img src={arrow} />
				</button>
			</div>
			<button className="send-button">보내기</button>
		</div>
	);
};

export default TransferKeypad;
