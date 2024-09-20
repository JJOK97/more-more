import React, { useState } from 'react';
import '@/assets/css/createGroup/CreateGroup.css';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Group Name:', groupName);
        console.log('Profile Image:', profileImage);
    };

    return (
        <div className="create-group">
            <form className="create-group-form" onSubmit={handleSubmit}>
                <div className="create-group-name-container">
                    <input
                        className="create-group-name"
                        placeholder='모임 이름 입력'
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>
                <div className="create-image-upload-container">
                    <label htmlFor="imageInput" className="create-image-input-label" style={{ display: 'none' }}>Profile Image:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="create-image-input"
                        style={{ display: 'none' }} // 숨겨진 파일 입력
                    />
                    <div className="create-image-upload" onClick={handleImageClick}>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="create-image-preview"
                            />
                        ) : (
                            <span className="create-add-photo">사진 추가</span>
                        )}
                    </div>
                </div>
                <button type="submit" className="create-group-button">완료</button>
            </form>
        </div>
    );
};

export default CreateGroup;
