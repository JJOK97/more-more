import React from 'react';
import edit from '@/assets/img/account/edit.svg';

const GroupDuesPayment = () => {
	return (
		<div className="dues-payment-date">
			<div className="dues-setting-top">
				<div className="dues-setting-title">회비 세부 설정</div>
				<div className="edit-save">
					<div>
						<img src={edit}></img>
					</div>
					<div>저장하기</div>
				</div>
			</div>
			<div className="dues-input">
				<div className="dues-date-text">
					<label htmlFor="date">납입일</label>
					<input
						type="text"
						id="date"
						placeholder="1일"
					/>
				</div>
				<div className="dues">
					<label htmlFor="amount">납부액</label>
					<input
						type="text"
						id="amount"
						placeholder="100,000원"
					/>
				</div>
			</div>
		</div>
	);
};

export default GroupDuesPayment;
