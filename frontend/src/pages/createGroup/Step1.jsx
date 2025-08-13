import React from 'react';

const Step1 = ({ handleNextStep }) => {
	return (
		<div className="create-group-step scroll-action">
			<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
				<div style={{ fontSize: '4rem', marginTop: '2rem' }}>🏦</div>
				<h2
					className="create-group-title"
					style={{ marginTop: '1.5rem' }}
				>
					모임통장 개설이 필요해요
				</h2>
				<p className="create-group-text">
					안전하고 투명한 모임 운영을 위해
					<br />
					공동 모임통장을 개설해드릴게요
				</p>
			</div>

			<div
				style={{
					background: 'linear-gradient(135deg, #f0fff4, #e6ffed)',
					padding: '1.5rem',
					borderRadius: '1rem',
					marginBottom: '1.5rem',
					border: '2px solid #a7f3d0',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.75rem',
						marginBottom: '1rem',
						width: '80%',
					}}
				>
					<span style={{ fontSize: '1.5rem' }}>💡</span>
					<strong style={{ color: '#52bd6d' }}>모임통장의 장점</strong>
				</div>
				<ul
					style={{
						listStyle: 'none',
						padding: 0,
						margin: 0,
						color: '#475569',
						lineHeight: '1.8',
					}}
				>
					<li style={{ marginBottom: '0.5rem' }}>✅ 투명한 회비 관리</li>
					<li style={{ marginBottom: '0.5rem' }}>✅ 자동 납부 시스템</li>
					<li style={{ marginBottom: '0.5rem' }}>✅ 실시간 잔액 확인</li>
					<li>✅ 안전한 공동 관리</li>
				</ul>
			</div>

			<div className="create-group-navigation-buttons">
				<button
					className="create-group-next-btn"
					onClick={handleNextStep}
					style={{ width: '100%' }}
				>
					시작하기
				</button>
			</div>
		</div>
	);
};

export default Step1;
