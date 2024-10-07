import React from 'react';

const FinishButton = ({ onClick }) => (
	<button
		className="create-post-finish-btn"
		onClick={onClick}
	>
		<img
			className="create-post-finish-icon"
			src="/feed/edit.svg"
			alt="Edit icon"
		/>
		<div className="create-post-finish-words">완료</div>
	</button>
);

export default FinishButton;
