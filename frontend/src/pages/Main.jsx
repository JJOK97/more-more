import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/GroupHeader';
import Calendar from '@/components/calendar/Calendar';

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
				<Calendar />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
