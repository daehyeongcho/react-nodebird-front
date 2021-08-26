import { nanoid } from 'nanoid'
import faker from 'faker'

import { createReducer } from '../utils'
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../actions/post'

/** post 상태 관리
 * - 홈 화면에 띄워줄 mainPosts 목록 및 이미지 업로드 경로,
 * - 트윗 작성 및 댓글 작성 비동기 요청에 따른 상태들 관리
 */
export const initialState = {
	/* 서버 쪽에서 데이터를 어떤 식으로 보낼 건지 미리 물어봐야 함 */
	mainPosts: [
		{
			postId: nanoid(),
			User: {
				userId: nanoid(),
				nickname: 'fosel',
			},
			content: '첫 번째 게시글 #해시태그 #빅테크',
			Images: [
				{
					imageId: nanoid(),
					src: 'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
				},
				{
					imageId: nanoid(),
					src: 'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=6a31',
				},
				{
					imageId: nanoid(),
					src: 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg',
				},
			],
			Comments: [
				{
					commentId: nanoid(),
					User: {
						userId: nanoid(),
						nickname: 'nero',
					},
					content: '꿈의 기업들',
				},
				{
					commentId: nanoid(),
					User: {
						userId: nanoid(),
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

/* 더미데이터 */
initialState.mainPosts = initialState.mainPosts.concat(
	Array(20)
		.fill()
		.map(() => ({
			postId: nanoid(),
			User: {
				userId: nanoid(),
				nickname: faker.name.findName(),
			},
			content: faker.lorem.paragraph(),
			Images: [],
			Comments: [
				{
					User: {
						id: nanoid(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
			],
		})),
)

/* 새 트윗 작성 */
const dummyPost = ({ postId, content, User }) => ({
	postId,
	content,
	User,
	Images: [],
	Comments: [],
})

/* 새 댓글 작성 */
const dummyComment = ({ commentId, content, User }) => ({
	commentId,
	content,
	User,
})

/* 리듀서: 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수 */
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
			/* mainPosts에 dummyPost(action.data) 추가 */
			return createReducer(
				ADD_POST_REQUEST,
				{ mainPosts: [dummyPost(action.data), ...state.mainPosts] },
				initialState,
			)(state, action)
		case REMOVE_POST_REQUEST:
		case REMOVE_POST_SUCCESS:
		case REMOVE_POST_FAILURE:
			/* mainPosts에서 action.data.postId랑 같은 post 삭제 */
			return createReducer(
				REMOVE_POST_REQUEST,
				{
					mainPosts: state.mainPosts.filter((post) => post.postId !== action.data.postId),
				},
				initialState,
			)(state, action)
		case ADD_COMMENT_REQUEST:
		case ADD_COMMENT_SUCCESS:
		case ADD_COMMENT_FAILURE:
			/** mainPosts에서 action.data.postId와 같은 post를 찾아서
			 * 그 Comments에 새로운 댓글 추가
			 */
			return createReducer(
				ADD_COMMENT_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.postId === action.data.postId
							? {
									...post,
									Comments: [dummyComment(action.data), ...post.Comments],
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
