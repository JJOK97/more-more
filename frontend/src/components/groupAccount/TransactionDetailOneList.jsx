import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noImage from '@/assets/img/account/no-image.png';
import { useTagNameStore } from '@/store/useTagNameStore';

const TransactionDetailOneList = () => {
	const location = useLocation();
	const { setTagName } = useTagNameStore();
	const {
		paymentData = '데이터 없음',
		paymentAmount = '0',
		date = '0000-00-00',
		time = '00:00:00',
		balance = '0',
		tagName = '태그 없음',
	} = location.state || {};

	const [accountMemo, setAccountMemo] = useState('메모 없음');
	const [accountImage, setAccountImage] = useState(noImage);
	const [isEditingMemo, setIsEditingMemo] = useState(false);
	const [memoInput, setMemoInput] = useState(accountMemo);
	const [imageFile, setImageFile] = useState(null);

	// 데이터 가져오기 (기존 메모 및 이미지)
	const fetchAccountHistory = async () => {
		if (!tagName) {
			console.log('유효하지 않은 태그명입니다.');
			return;
		}
		if (tagName === '태그 없음') {
			console.log('태그가 없습니다.');
			return;
		}

		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${tagName}/verification`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 응답이 비어 있지 않은지 확인
			const text = await response.text();
			if (!text) {
				console.log('Empty response from the server.');
				setAccountMemo('메모가 없습니다');
				setMemoInput('메모가 없습니다');
				setAccountImage(noImage);
				return;
			}

			const { accountHistoryMemo, accountHistoryImage } = JSON.parse(text);
			setAccountMemo(accountHistoryMemo || '메모가 없습니다');
			setMemoInput(accountHistoryMemo || '메모가 없습니다');
			setAccountImage(accountHistoryImage || noImage);
		} catch (error) {
			console.error('Error fetching account history:', error);
			setAccountMemo('메모를 불러오는 중 오류가 발생했습니다.');
			setMemoInput('메모를 불러오는 중 오류가 발생했습니다.');
			setAccountImage(noImage);
		}
	};

	useEffect(() => {
		fetchAccountHistory();
	}, [tagName]);

	// 메모 수정 핸들러
	const handleMemoBlur = async () => {
		setIsEditingMemo(false);
		setAccountMemo(memoInput || '메모가 없습니다'); // 메모가 없을 경우 기본값 설정
		await updateAccountHistory(); // 메모 수정 후 API 호출
	};

	// 이미지 업로드 핸들러
	const handleImageClick = () => {
		const fileInput = document.getElementById('imageUpload');
		if (fileInput) {
			fileInput.click(); // 이미지 업로드 창을 엽니다.
		}
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			console.log('이미지 파일:', file); // 이미지 파일 정보를 출력
			setImageFile(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setAccountImage(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// API에 PUT 요청으로 메모와 이미지 업데이트
	const updateAccountHistory = async () => {
		if (!tagName || tagName === '태그 없음') {
			console.log('유효하지 않은 태그명입니다.');
			return;
		}

		const formData = new FormData();
		formData.append('accountHistoryMemo', memoInput || '메모가 없습니다'); // 수정된 메모 추가
		if (imageFile) {
			formData.append('accountHistoryImage', imageFile); // 업로드된 이미지 추가
		}

		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${tagName}/verification`, {
				method: 'PUT',
				body: formData,
			});
			console.log('tagName: ', { tagName });
			console.log('formData: ', formData.entries);
			for (let pair of formData.entries()) {
				console.log(`${pair[0]}: ${pair[1]}`);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			console.log('Account history updated successfully!');

			// PUT 요청 후 최신 데이터를 다시 가져옴
			await fetchAccountHistory();
		} catch (error) {
			console.error('Error updating account history:', error);
		}
	};

	const handleMoveToPost = () => {
		setTagName(tagName);
		console.log('Tag name set: ', tagName);
	};

	return (
		<div className="transaction-detail">
			<div>
				<div className="transaction-detail-one-list">
					<div className="transaction-detail-date">{date}</div>
					<div className="deposit-list-place-price">
						<div className="deposit-list-place">{paymentData}</div>
						<div className="deposit-list-price">{paymentAmount}원</div>
					</div>
					<div className="deposit-list-time-balance">
						<div className="deposit-list-time">{time}</div>
						<div className="deposit-list-balance">{balance}원</div>
					</div>
				</div>
				<div className="bill-area">
					<img
						src={accountImage}
						alt="account history"
						onClick={handleImageClick}
						onError={(e) => (e.target.src = noImage)}
					/>
					<input
						id="imageUpload"
						type="file"
						accept="image/*"
						style={{ display: 'none' }}
						onChange={handleImageChange}
					/>
					<div className="bill-text">
						<div className="memo">메모</div>
						{isEditingMemo ? (
							<input
								type="text"
								value={memoInput}
								onChange={(e) => setMemoInput(e.target.value)}
								onBlur={handleMemoBlur}
								autoFocus
							/>
						) : (
							<div
								className="memo-content"
								onClick={() => setIsEditingMemo(true)}
								style={{ cursor: 'pointer' }}
							>
								{accountMemo}
							</div>
						)}
					</div>
				</div>
			</div>
			<button
				className="move-to-post"
				onClick={handleMoveToPost}
			>
				관련 게시글로 이동
			</button>
		</div>
	);
};

export default TransactionDetailOneList;
