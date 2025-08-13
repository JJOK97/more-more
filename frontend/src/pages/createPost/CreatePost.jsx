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
import { useTagNameStore } from '@/store/useTagNameStore';

const CreatePost = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const [images, setImages] = useState([]);
	const [content, setContent] = useState('');
	const [accountHistoryTag, setAccountHistoryTag] = useState(''); // 추가 태그 상태 관리
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
	const { tagName } = useTagNameStore();
	const navigate = useNavigate();

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				// 테스트 그룹인지 확인
				if (groupId.startsWith('TEST')) {
					const testGroups = JSON.parse(localStorage.getItem('testGroups') || '[]');
					const testGroup = testGroups.find((group) => group.clubCode === groupId);
					if (testGroup) {
						setGroupInfo(testGroup);
						return;
					}
				}

				// 실제 API 호출
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
		const memberId = localStorage.getItem('memberId');
		const clubCode = groupId;

		// 테스트 그룹인지 확인
		if (groupId.startsWith('TEST')) {
			// 테스트 그룹의 경우 localStorage에 게시물 저장
			const newPost = {
				postingId: Date.now(),
				memberId: memberId,
				clubCode: clubCode,
				accountHistoryTag: tagName || '',
				postingContent: content,
				createdDate: new Date().toISOString(),
				commentCount: 0,
				likeCount: 0,
				images: images.map((img) => img.preview), // 이미지 미리보기 URL 저장
				memberName: '옥진석', // 테스트 사용자명
				memberProfileImage: '/user/profile_man.jpg',
			};

			// 기존 테스트 게시물들 가져오기
			const existingPosts = JSON.parse(localStorage.getItem(`testPosts_${groupId}`) || '[]');

			// 새 게시물 추가 (최신 순으로 정렬하기 위해 앞에 추가)
			existingPosts.unshift(newPost);

			// localStorage에 저장
			localStorage.setItem(`testPosts_${groupId}`, JSON.stringify(existingPosts));

			console.log('Test post created successfully:', newPost);
			navigate(-1);
			return;
		}

		// 실제 API 호출
		const formData = new FormData();
		formData.append('memberId', parseInt(memberId));
		formData.append('clubCode', clubCode);
		formData.append('accountHistoryTag', tagName);
		formData.append('postingContent', content);
		images.forEach((image) => {
			formData.append('files', image.file);
		});

		try {
			const response = await fetch('https://j11a605.p.ssafy.io/api/posting', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Post created successfully:', responseData);
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
