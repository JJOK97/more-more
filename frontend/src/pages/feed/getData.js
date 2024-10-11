// getData.js

export const getDatas = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data; // 데이터를 반환
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
    }
};
