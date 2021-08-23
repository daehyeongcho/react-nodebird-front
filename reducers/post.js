export const initialState = {
	// 서버 쪽에서 데이터를 어떤 식으로 보낼 건지 미리 물어봐야 함
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: '랜디',
			},
			content: '첫 번째 게시글 #해시태그 #익스프레스',
			Images: [
				{
					src: 'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
				},
				{
					src: 'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=6a31',
				},
				{ src: 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' },
			],
			Comments: [
				{
					User: {
						nickname: 'nero',
					},
					content: '꿈의 기업들',
				},
				{
					User: {
						nickname: 'randy',
					},
					content: '빅테크 기업들',
				},
			],
		},
	],
	imagePaths: [], // 이미지 업로드 시 경로
	postAdded: false, // 게시글 추가 완료됐을 때
}

const ADD_POST = 'ADD_POST'
export const addPost = (data) => {
	return {
		type: ADD_POST,
		data,
	}
}
const dummyPost = {
	id: 2,
	content: '더미 데이터입니다.',
	User: {
		id: 1,
		nickname: '랜디',
	},
	Images: [],
	Comments: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				mainPosts: [dummyPost, ...state.mainPosts],
				postAdded: true,
			}
		default:
			return state
	}
}

export default reducer
