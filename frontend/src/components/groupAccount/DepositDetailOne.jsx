import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTagNameStore } from '@/store/useTagNameStore';

const DepositDetailOne = ({
	id,
	paymentData,
	paymentAmount,
	date,
	time,
	balance,
	searchTerm,
	paymentType,
	tagName,
	onClick,
	checkVerification,
}) => {
	const location = useLocation();
	const { groupId } = useParams();
	const setTagName = useTagNameStore((state) => state.setTagName);
	const currentTagName = useTagNameStore((state) => state.tagName);

	// 날짜를 'YYYY-MM-DD' 형식으로 변환하는 함수
	const formatDate = (dateString) => {
		const year = dateString.slice(0, 4);
		const month = dateString.slice(4, 6);
		const day = dateString.slice(6, 8);
		return `${year}-${month}-${day}`;
	};

	// 시간을 'HH:MM:SS' 형식으로 변환하는 함수
	const formatTime = (timeString) => {
		const hour = timeString.slice(0, 2);
		const minute = timeString.slice(2, 4);
		const second = timeString.slice(4, 6);
		return `${hour}:${minute}:${second}`;
	};

	// 시간을 현재 시각과 비교하여 표현하는 함수
	const calculateTimeAgo = () => {
		const currentDate = new Date();
		const depositDate = new Date(`${formatDate(date)}T${formatTime(time)}`);
		const diffInMilliseconds = currentDate - depositDate;
		const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);

		if (diffInMinutes < 60) {
			return `${diffInMinutes}분 전`;
		} else if (diffInHours < 24) {
			return `${diffInHours}시간 전`;
		} else {
			const depositMonth = depositDate.getMonth() + 1;
			const depositDay = depositDate.getDate();
			return `${depositMonth}월 ${depositDay}일`;
		}
	};

	// 금액을 포맷하는 함수 (숫자에 콤마 추가)
	const formatAmount = (amount) => {
		return parseInt(amount, 10).toLocaleString();
	};

	// paymentType에 따라 금액에 + 또는 - 부호를 추가하고 입금 시 초록색으로 표시
	const formattedAmount = () => {
		if (paymentType === '출금(이체)') {
			return `-${formatAmount(paymentAmount)}`;
		} else if (paymentType === '입금(이체)') {
			return `+${formatAmount(paymentAmount)}`;
		}
		return formatAmount(paymentAmount);
	};

	// 금액 스타일을 설정하는 함수 (입금 시 초록색)
	const amountStyle = paymentType === '입금(이체)' ? { color: 'green' } : {};

	const handleClick = () => {
		if (location.pathname.includes('/group') && location.pathname.includes('/create')) {
			// alert(`${paymentData} ${time}`);
			useTagNameStore(tagName);
			checkVerification(tagName);
			console.log('setTagName: ', tagName);
			console.log('currentTagName from Zustand: ', currentTagName);
			onClose();
		}
	};

	const handleDepositClick = async (tagName) => {
		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${tagName}/isverificationin`, {
				method: 'POST',
			});
			if (response.ok) {
				console.log(`Verification for ${tagName} created successfully`);
			} else {
				console.error(`Verification creation failed for ${tagName}, Status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error during verification creation:', error);
		}
	};

	const handleImageUpload = async (tagName, file) => {
		const formData = new FormData();
		formData.append('accountHistoryImage', file);

		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${tagName}/verificationimage`, {
				method: 'PUT',
				body: formData,
			});
			if (response.ok) {
				console.log('Image uploaded successfully');
			} else {
				console.error(`Image upload failed, Status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error during image upload:', error);
		}
	};

	const handleMemoUpdate = async (tagName, memo) => {
		try {
			const response = await fetch(
				`https://j11a605.p.ssafy.io/api/account/${tagName}/verificationmemo?accountHistoryMemo=${memo}`,
				{
					method: 'PUT',
				},
			);
			if (response.ok) {
				console.log('Memo updated successfully');
			} else {
				console.error(`Memo update failed, Status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error during memo update:', error);
		}
	};

	// 사용자가 메모 입력을 완료한 후 focus가 벗어나면 호출
	const handleMemoBlur = (e) => {
		const memo = e.target.value;
		handleMemoUpdate(tagName, memo);
	};

	// 사용자가 이미지를 선택했을 때 호출
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		handleImageUpload(tagName, file);
	};

	const highlightText = (text, searchTerm) => {
		if (!searchTerm) return text;
		const regex = new RegExp(`(${searchTerm})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, index) =>
			regex.test(part) ? (
				<span
					key={index}
					style={{ backgroundColor: 'yellow' }}
				>
					{part}
				</span>
			) : (
				part
			),
		);
	};

	return (
		<div
			className="deposit-detail-one"
			onClick={onClick}
		>
			{location.pathname.includes('/group') && location.pathname.includes('/create') ? (
				<div className="deposit-detail-container">
					<div className="deposit-list-place-price">
						<div className="deposit-list-place"> {highlightText(paymentData, searchTerm)}</div>
						<div
							className="deposit-list-price"
							style={amountStyle}
						>
							{formattedAmount()}
						</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{calculateTimeAgo()}</div>
						<div className="deposit-list-balance">{formatAmount(balance)}</div>
					</div>
				</div>
			) : (
				<Link
					className="deposit-detail-container"
					to={`/group/${groupId}/account/${id}`}
					state={{
						id,
						paymentData,
						paymentAmount: formattedAmount(),
						date: formatDate(date),
						time: formatTime(time),
						balance: formatAmount(balance),
						tagName,
						paymentType,
					}}
				>
					<div className="deposit-list-place-price">
						<div className="deposit-list-place"> {paymentData} </div>
						<div
							className="deposit-list-price"
							style={amountStyle}
						>
							{formattedAmount()}
						</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{calculateTimeAgo()}</div>
						<div className="deposit-list-balance">{formatAmount(balance)}</div>
					</div>
				</Link>
			)}
		</div>
	);
};

export default DepositDetailOne;
