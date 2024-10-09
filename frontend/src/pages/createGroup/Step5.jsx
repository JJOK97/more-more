import React, { useState } from 'react';

const Step5 = ({
    handlePrevStep,
    handleNextStep,
    groupName,
    setGroupName,
    imagePreview,
    profileImage,
    handleImageChange,
    fee,
    setFee,
    intro,
    setIntro,
    password,
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleComplete = async () => {
        setLoading(true);
        setError(null);

        try {
            const creatorId = localStorage.getItem('memberId');
            const ssafyUserKey = localStorage.getItem('userKey');

            const clubCreateRequest = {
                dues: Number(fee),
                creatorId: Number(creatorId),
                clubName: groupName,
                clubIntro: intro,
                ssafyUserKey: ssafyUserKey,
                accountPwd: password,
            };

            const formData = new FormData();
            formData.append('file', profileImage);
            formData.append(
                'clubCreateRequest',
                new Blob([JSON.stringify(clubCreateRequest)], {
                    type: 'application/json',
                }),
            );

            const response = await fetch('https://j11a605.p.ssafy.io/api/club', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
				handleNextStep();
           
            } else {
                throw new Error('모임 생성에 실패했습니다.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-group-step">
            <h2 className="create-group-title">모임 설정</h2>
            <input
                type="text"
                placeholder="모임 이름"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="create-group-input"
            />
            <div className="create-group-image-upload">
                <label htmlFor="imageUpload" className="create-group-image-label">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="create-group-image-preview"
                        />
                    ) : (
                        '프로필 이미지 업로드'
                    )}
                </label>
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="create-group-image-input"
                    style={{ display: 'none' }}
                />
            </div>
            <input
                type="text"
                placeholder="회비 (예: 10000)"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="create-group-input"
            />
            <input
                type="text"
                placeholder="모임 소개"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="create-group-input"
            />
            <div className="create-group-navigation-buttons">
                <button className="create-group-prev-btn" onClick={handlePrevStep}>
                    이전
                </button>
                <button
                    className="create-group-next-btn"
                    onClick={handleComplete}
                    disabled={loading}
                >
                    {loading ? '처리 중...' : '완료'}
                </button>
            </div>
            {error && <p className="create-group-error">{error}</p>}
        </div>
    );
};

export default Step5;