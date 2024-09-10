import React from 'react';
import { useNavigate } from 'react-router-dom';

import '@/assets/css/common/Main.css';

const Main = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<div className="main">
			<h1>Welcome to Main Page</h1>
			<button onClick={handleLogin}>Go to Login</button>
		</div>
	);
};

export default Main;
