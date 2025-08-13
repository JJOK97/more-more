import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/userAPI';

import LoadingPage from '@/components/common/LodingPage';

import '@/assets/css/user/login.css';

import icon from '@/assets/img/common/icon.svg';

const Login = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => {
				setLoading(false);
			}, 250);
		}, 1000);
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log('로그인 시도 중...'); // 디버깅을 위한 로그
		setError('');

		// 테스트용 로그인 정보 확인
		if (phoneNumber === '01012345678' && password === '1234') {
			console.log('테스트 로그인 성공');
			// 테스트용 토큰 및 사용자 정보 설정
			localStorage.setItem('accessToken', 'test-access-token');
			localStorage.setItem('refreshToken', 'test-refresh-token');
			localStorage.setItem('memberId', 'test-member-id');
			localStorage.setItem('userKey', 'test-user-key');
			localStorage.setItem('phoneNumber', phoneNumber);

			// 테스트용 사용자 프로필 정보 저장
			const testUserInfo = {
				name: '옥진석',
				phoneNumber: '01012345678',
				birthDate: '1997-04-14',
				email: 'okjinseok@gmail.com',
				address: '서울특별시 강남구 역삼동',
				accountNumber: '1002-123-456789',
				bank: 'BNK',
				profileImageUrl: '/user/profile_man.jpg',
			};
			localStorage.setItem('testUserInfo', JSON.stringify(testUserInfo));

			navigate('/'); // 메인 페이지로 이동
			return;
		}

		try {
			const response = await loginUser(phoneNumber, password);
			console.log('로그인 성공:', response);
			navigate('/'); // 로그인 성공 시 메인 페이지('/')로 이동
		} catch (error) {
			console.error('로그인 실패:', error);
			setError('로그인에 실패했습니다. 휴대폰 번호와 비밀번호를 확인해주세요.');
		}
	};

	return (
		<>
			{loading && <LoadingPage fadeOut={fadeOut} />}
			<div className={`login-container ${!loading ? 'fade-in' : ''}`}>
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
						{error && <div className="error-message">{error}</div>}
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
		</>
	);
};

export default Login;
