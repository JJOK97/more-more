import React from 'react';

const Header = ({ onBillIconClick }) => (
    <div className='create-post-upper'>
        <div className='create-post-upper-words'>글쓰기</div>
        <img
            className='create-post-upper-icon'
            src='/create/bill.svg'
            alt="Bill icon"
            onClick={onBillIconClick} // Bill icon 클릭 시 모달 열림
            style={{ cursor: 'pointer' }}
        />
    </div>
);

export default Header;
