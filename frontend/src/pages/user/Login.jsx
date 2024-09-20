import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '@/assets/css/user/login.css';

import icon from '@/assets/img/common/icon.svg';

const Login = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
		console.log('로그인 시도:', phoneNumber, password);
	};

	return (
		<div className="login-container">
			<div className="login-logo">
				<img
					src={icon}
					alt="logo"
				/>
			</div>
			<div className="login-area">
				<div className="login-text">로그인</div>
				<form
					onSubmit={handleLogin}
					className="info-container"
				>
					<div className="info-phone">
						<label htmlFor="phone-number">휴대폰 번호</label>
						<input
							id="phone-number"
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
						/>
					</div>
					<div className="info-password">
						<label htmlFor="password">비밀번호</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="button-container">
						<button
							type="submit"
							className="login-button"
						>
							로그인
						</button>
					</div>
				</form>
				<div className="signup-link">
					계정이 없으신가요?{' '}
					<Link
						className="signup-button"
						to="/signup"
					>
						회원가입
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
