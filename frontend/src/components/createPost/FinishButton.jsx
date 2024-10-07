import React from 'react';

const FinishButton = () => (
    <button className="create-post-finish-btn">
        <img className='create-post-finish-icon' src='/feed/edit.svg' alt="Edit icon" />
        <div className='create-post-finish-words'>완료</div>
    </button>
);

export default FinishButton;