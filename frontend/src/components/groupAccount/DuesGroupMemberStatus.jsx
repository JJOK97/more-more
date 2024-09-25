import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import '@/assets/css/groupAccount/ProgressBar.css';

const DuesGroupMemberStatus = () => {
	return (
		<div className="dues-group-member-status">
			<div>모임원 납부 현황</div>
			<div className="dues-member-gather-count">
				<div className="dues-people-count">4/5 명 완료</div>
				<div>
					<span className="dues-gather">400,000원 </span>모임
				</div>
			</div>
			<div className="progress-bar">
				<ProgressBar
					completed={60}
					className="wrapper"
					barContainerClassName="container"
					completedClassName="barCompleted"
					labelClassName="label"
				/>
			</div>
			<div className="dues-member-list">
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
				<div className="dues-one-member">
					<div>
						<input
							type="checkbox"
							id="신승호"
							name="신승호"
						/>
					</div>
					<div>
						<label htmlFor="신승호">신승호</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DuesGroupMemberStatus;
