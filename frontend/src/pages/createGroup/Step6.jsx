import React from 'react';
import { Link } from 'react-router-dom';

const Step6 = ({ groupName }) => {
	return (
		<div className="create-group-step">
			<h2 className="create-group-title">모임을 만들었습니다!</h2>
			<p className="create-group-text">계좌번호: 123-456-789</p>
			<p className="create-group-text">모임 이름: {groupName}</p>
			<Link
				to={'/'}
				className="create-group-home-link"
			>
				<button className="create-group-home-btn">홈으로 이동</button>
			</Link>
		</div>
	);
};

export default Step6;
