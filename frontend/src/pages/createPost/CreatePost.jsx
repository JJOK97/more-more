import React, { useEffect, useState } from 'react';
import Header from '@/components/createPost/Header';
import ContentInput from '@/components/createPost/ContentInput';
import ImageGrid from '@/components/createPost/ImageGrid';
import ImageUpload from '@/components/createPost/ImageUpload';
import FinishButton from '@/components/createPost/FinishButton';
import './CreatePost.css';
import useGroupName from '@/store/useGroupName';
import { useNavigate, useParams } from 'react-router-dom';
import AddTagModal from './AddTagModal';
import { getDatas } from '../feed/getData';

const CreatePost = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const [images, setImages] = useState([]);
	const [content, setContent] = useState('');
	const [accountHistoryTag, setAccountHistoryTag] = useState(''); // 추가 태그 상태 관리
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
	const navigate = useNavigate();

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				setGroupInfo(data);
			} catch (error) {
				console.error('Error fetching group info:', error);
			}
		};
		getGroupInfo();
	}, [groupId]);

	// groupInfo가 업데이트될 때, groupName 상태를 업데이트
	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	const handleImageUpload = (newImages) => {
		setImages((prevImages) => [...prevImages, ...newImages]);
		console.log(images);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async () => {
		const memberId = localStorage.getItem('memberId'); // localStorage에서 memberId 가져오기
		const clubCode = groupId; // URL에서 추출한 groupId를 clubCode로 사용
		const formData = new FormData();

		// FormData에 데이터 추가
		formData.append('memberId', parseInt(memberId)); // integer
		formData.append('clubCode', clubCode); // string
		formData.append('accountHistoryTag', accountHistoryTag); // string
		formData.append('postingContent', content); // string
		images.forEach((image) => {
			formData.append('files', image.file); // 배열이므로 같은 키를 반복해서 추가
		});

		try {
			// 서버에 POST 요청 보내기
			const response = await fetch('https://j11a605.p.ssafy.io/api/posting', {
				method: 'POST',
				body: formData, // FormData를 요청 본문으로 설정
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Post created successfully:', responseData);
				// 성공 후 추가 동작 (예: 페이지 이동 또는 알림)
				navigate(-1);
			} else {
				console.error('Error creating post:', response.statusText);
			}
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	return (
		<div className="create-post-container">
			<Header onBillIconClick={openModal} /> {/* Bill icon 클릭 시 모달 열기 */}
			<ContentInput
				content={content}
				setContent={setContent}
			/>
			<ImageGrid
				images={images}
				onRemoveImage={handleRemoveImage}
			/>
			<ImageUpload onImageUpload={handleImageUpload} />
			<FinishButton onClick={handleSubmit} /> {/* FinishButton 클릭 시 handleSubmit 호출 */}
			{/* 모달 */}
			{isModalOpen && <AddTagModal onClose={closeModal} />}
		</div>
	);
};

export default CreatePost;
