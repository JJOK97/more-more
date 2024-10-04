import React from 'react';

const Step2 = ({ handlePrevStep, handleNextStep, termsAccepted, setTermsAccepted }) => {
	return (
		<div className="create-group-step">
			<h2 className="create-group-title">공동명의예금 확인서</h2>
			<p className="create-group-text">내용 생략...</p>
			<label className="create-group-checkbox-container">
				<input
					type="checkbox"
					className="create-group-checkbox"
					checked={termsAccepted}
					onChange={(e) => setTermsAccepted(e.target.checked)}
				/>
				위의 내용을 전부 확인하였습니다.
			</label>
			<div className="create-group-navigation-buttons">
				<button
					className="create-group-prev-btn"
					onClick={handlePrevStep}
				>
					이전
				</button>
				<button
					className="create-group-next-btn"
					onClick={handleNextStep}
					disabled={!termsAccepted}
				>
					다음
				</button>
			</div>
		</div>
	);
};

export default Step2;
