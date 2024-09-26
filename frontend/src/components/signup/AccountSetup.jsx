import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSetup = () => {
	const navigate = useNavigate();

	const handleRegisterNow = () => {
		navigate('/register-account');
	};

	const handleRegisterLater = () => {
		navigate('/login');
	};

	return (
		<div>
			<h2>Account Setup: 계좌 등록</h2>
			<p>계좌를 지금 등록하시겠습니까?</p>
			<div>
				<button
					type="button"
					onClick={handleRegisterNow}
				>
					계좌 등록하기
				</button>
				<button
					type="button"
					onClick={handleRegisterLater}
				>
					다음에 등록하기
				</button>
			</div>
		</div>
	);
};

export default AccountSetup;
