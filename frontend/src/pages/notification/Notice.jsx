import React from 'react';
import data from './data.json';
import './Notice.css';

const Notice = () => {
	const datas = data.notice;

	return (
		<div className="notice-container">
			<div className="notice-content">
				{datas
					? datas.map((data) => (
							<div
								key={data.id}
								className={`notice-item`}
							>
								<div className={`notice-content`}>{data.content}</div>
							</div>
					  ))
					: ''}
			</div>
		</div>
	);
};

export default Notice;
