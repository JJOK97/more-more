import React from 'react';

const Step2 = ({ handlePrevStep, handleNextStep, termsAccepted, setTermsAccepted }) => {
	return (
		<div className="create-group-step scroll-action">
			<div style={{ textAlign: 'center' }}>
				<div style={{ fontSize: '3rem', marginTop: '2rem' }}>📋</div>
				<h2 className="create-group-title">약관 동의</h2>
				<p className="create-group-text">
					안전한 모임통장 개설을 위해
					<br />
					아래 내용을 확인해주세요
				</p>
			</div>

			<div
				style={{
					background: '#f8fafc',
					border: '2px solid #e2e8f0',
					borderRadius: '1rem',
					padding: '1.5rem',
					marginBottom: '0.5rem',
					maxHeight: '200px',
					overflowY: 'auto',
				}}
			>
				<h3
					style={{
						color: '#374151',
						fontSize: '1.1rem',
						fontWeight: '600',
						marginBottom: '1rem',
					}}
				>
					공동명의예금 약관
				</h3>
				<div
					style={{
						color: '#6b7280',
						lineHeight: '1.6',
						fontSize: '0.9rem',
					}}
				>
					<p>1. 본 계좌는 모임의 공동 자금 관리를 위한 목적으로 개설됩니다.</p>
					<p>2. 모든 거래 내역은 모임원들에게 투명하게 공개됩니다.</p>
					<p>3. 회비 납부 및 출금은 모임 규칙에 따라 진행됩니다.</p>
					<p>4. 계좌 해지 시 잔액은 모임원들에게 공평하게 분배됩니다.</p>
					<p>5. 개인정보는 모임 운영 목적으로만 사용됩니다.</p>
				</div>
			</div>

			<label className="create-group-checkbox-container">
				<input
					type="checkbox"
					className="create-group-checkbox"
					checked={termsAccepted}
					onChange={(e) => setTermsAccepted(e.target.checked)}
				/>
				위의 약관을 모두 읽고 동의합니다 ✓
			</label>

			<div className="create-group-navigation-buttons">
				<button
					className="create-group-prev-btn"
					onClick={handlePrevStep}
				>
					← 이전
				</button>
				<button
					className="create-group-next-btn"
					onClick={handleNextStep}
					disabled={!termsAccepted}
				>
					다음 →
				</button>
			</div>
		</div>
	);
};

export default Step2;
