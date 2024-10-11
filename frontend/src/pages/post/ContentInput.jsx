import React, { useRef, useEffect } from 'react';

const ContentInput = ({ content, setContent }) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		const autoResize = () => {
			textarea.style.height = 'auto'; // 초기화
			textarea.style.height = `${Math.min(textarea.scrollHeight - 16, 90)}px`; // 최대 4줄 높이로 설정
		};

		textarea.addEventListener('input', autoResize);

		return () => {
			textarea.removeEventListener('input', autoResize);
		};
	}, []);

	return (
		<textarea
			className="comment-input-box"
			ref={textareaRef}
			value={content}
			onChange={(e) => setContent(e.target.value)}
			rows="1"
			placeholder="댓글을 입력하세요..."
		/>
	);
};

export default ContentInput;
