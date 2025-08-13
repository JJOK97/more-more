import React from 'react';
import { Link } from 'react-router-dom';

const Step6 = ({ groupName }) => {
	return (
		<div className="create-group-step scroll-action">
			<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
				<div style={{ fontSize: '4rem', marginTop: '2rem', marginBottom: '0.5rem' }}>🎉</div>
				<h2 className="create-group-title">축하합니다!</h2>
				<p className="create-group-text">모임이 성공적으로 생성되었습니다</p>
			</div>

			<div
				style={{
					background: 'linear-gradient(135deg, #f0fff4, #e6ffed)',
					border: '2px solid #52bd6d',
					borderRadius: '1.5rem',
					padding: '2rem',
					textAlign: 'center',
					marginBottom: '1.5rem',
				}}
			>
				<div
					style={{
						fontSize: '1.5rem',
						marginBottom: '1rem',
						color: '#52bd6d',
					}}
				>
					🎯
				</div>
				<h3
					style={{
						color: '#166534',
						fontSize: '1.25rem',
						fontWeight: '700',
						marginBottom: '1rem',
					}}
				>
					{groupName}
				</h3>
				<div
					style={{
						background: 'rgba(255, 255, 255, 0.8)',
						padding: '1rem',
						borderRadius: '0.75rem',
						marginBottom: '1rem',
					}}
				>
					<div
						style={{
							color: '#64748b',
							fontSize: '0.875rem',
							marginBottom: '0.25rem',
						}}
					>
						모임통장 번호
					</div>
					<div
						style={{
							color: '#1e293b',
							fontSize: '1.125rem',
							fontWeight: '600',
							fontFamily: 'monospace',
						}}
					>
						123-456-789
					</div>
				</div>
				<div
					style={{
						color: '#475569',
						fontSize: '0.9rem',
						lineHeight: '1.3',
					}}
				>
					✅ 모임통장이 개설되었습니다
					<br />✅ 이제 멤버들을 초대해보세요!
				</div>
			</div>

			<Link
				to={'/'}
				style={{ textDecoration: 'none', width: '100%' }}
			>
				<button
					className="create-group-next-btn"
					style={{
						width: '100%',
						background: '#52bd6d',
						fontSize: '1.1rem',
						padding: '1rem 2rem',
					}}
				>
					홈으로 이동하기
				</button>
			</Link>
		</div>
	);
};

export default Step6;
