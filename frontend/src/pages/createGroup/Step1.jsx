import React from 'react';

const Step1 = ({ handleNextStep }) => {
	return (
		<div className="create-group-step">
			<h2 className="create-group-title">모임을 진행하기 위해서는 모임통장 개설이 필요해요.</h2>
			<div className="create-group-navigation-buttons">
				<button
					className="create-group-next-btn"
					onClick={handleNextStep}
				>
					다음
				</button>
			</div>
		</div>
	);
};

export default Step1;
