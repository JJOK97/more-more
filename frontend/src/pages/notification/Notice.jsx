import React from 'react';
import data from './data.json';

const Notice = () => {
	const datas = data.notice;

	return (
		<div>
			<div>
				{datas
					? datas.map((data) => (
							<div key={data.id}>
								<div>{data.content}</div>
							</div>
					  ))
					: ''}
			</div>
		</div>
	);
};

export default Notice;
