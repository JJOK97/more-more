import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/MainHeader';
import Footer from '@/components/common/GroupFooter';

import '@/assets/css/common/Main.css';

const Main = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<div className="main">
			<Header />
			<div className="body">
				<h1>Welcome to Main Page</h1>
				<button onClick={handleLogin}>Go to Login</button>
			</div>
			<Footer />
		</div>
	);
};

export default Main;
