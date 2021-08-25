import { nanoid } from 'nanoid'

import { createReducer } from '../utils'

export const initialState = {
	// 서버 쪽에서 데이터를 어떤 식으로 보낼 건지 미리 물어봐야 함
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: '랜디',
			},
			content: '첫 번째 게시글 #해시태그 #빅테크',
			Images: [
				{
					id: nanoid(),
					src: 'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
				},
				{
					id: nanoid(),
					src: 'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=6a31',
				},
				{ id: nanoid(), src: 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' },
			],
			Comments: [
				{
					id: nanoid(),
					User: {
						id: nanoid(),
						nickname: 'nero',
					},
					content: '꿈의 기업들',
				},
				{
					id: nanoid(),
					User: {
						id: nanoid(),
						nickname: 'randy',
					},
					content: '빅테크 기업들',
				},
			],
		},
	],
	imagePaths: [], // 이미지 업로드 시 경로
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
}

const dummyPost = (data) => ({
	id: nanoid(),
	content: data,
	User: {
		id: 1,
		nickname: '랜디',
	},
	Images: [],
	Comments: [],
})

const dummyComment = (data) => ({
	id: nanoid(),
	content: data,
	User: {
		id: 1,
		nickname: '랜디',
	},
})

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPostRequest = (data) => ({
	type: ADD_POST_REQUEST,
	data,
})
export const addCommentRequest = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data,
})

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
			return createReducer(
				ADD_POST_REQUEST,
				{ mainPosts: [dummyPost(action.data), ...state.mainPosts] },
				initialState,
			)(state, action)
		case ADD_COMMENT_REQUEST:
		case ADD_COMMENT_SUCCESS:
		case ADD_COMMENT_FAILURE:
			return createReducer(
				ADD_COMMENT_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.id === action.data.postId
							? {
									...post,
									Comments: [dummyComment(action.data.content), ...post.Comments],
							  }
							: post,
					),
				},
				initialState,
			)(state, action)
		default:
			return state
	}
}

export default reducer
