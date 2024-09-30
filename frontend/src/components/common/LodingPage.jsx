import React from 'react';
import '@/assets/css/common/loadingPage.css';

import icon from '@/assets/img/common/icon.svg';
import logo from '@/assets/img/common/text-logo.svg';

const LoadingPage = ({ fadeOut }) => {
	return (
		<div className={`loading-page ${fadeOut ? 'fade-out' : ''}`}>
			<div className="logo-area">
				<img
					src={icon}
					alt="Icon"
				/>
				<div className="text-logo">
					<img
						src={logo}
						alt="Logo"
					/>
					<div>함께 모아, 추억 모아</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingPage;
