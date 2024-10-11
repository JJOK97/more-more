import React from 'react';

const DepositListDate = ({ date }) => {
	// date가 없을 때 기본 메시지를 설정할 수도 있음
	const displayDate = date ? date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : '날짜 선택';

	return <div>{displayDate}</div>;
};

export default DepositListDate;
