import { nanoid } from 'nanoid'
import faker from 'faker'

import { createReducer } from '../utils'
import {
	ADD_POST_REQUEST, // 트윗 작성 요청 액션
	ADD_POST_SUCCESS, // 트윗 작성 성공 액션
	ADD_POST_FAILURE, // 트윗 작성 실패 액션
	REMOVE_POST_REQUEST, // 트윗 삭제 요청 액션
	REMOVE_POST_SUCCESS, // 트윗 삭제 성공 액션
	REMOVE_POST_FAILURE, // 트윗 삭제 실패 액션
	ADD_COMMENT_REQUEST, // 댓글 작성 요청 액션
	ADD_COMMENT_SUCCESS, // 댓글 작성 성공 액션
	ADD_COMMENT_FAILURE, // 댓글 작성 실패 액션
} from '../actions/post'

/** post state에 들어있는 property들 */
export const initialState = {
	/* 서버 쪽에서 데이터를 어떤 식으로 보낼 건지 미리 물어봐야 함 */
	mainPosts: [
		// 홈 화면에서 띄워 줄 글 목록
		{
			id: nanoid(),
			User: {
				id: nanoid(),
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
	addPostLoading: false, // 트윗 작성 시도 중
	addPostDone: false, // 트윗 작성 완료
	addPostError: null, // 트윗 작성 에러
	removePostLoading: false, // 트윗 삭제 시도 중
	removePostDone: false, // 트윗 삭제 완료
	removePostError: null, // 트윗 삭제 에러
	addCommentLoading: false, // 댓글 작성 시도 중
	addCommentDone: false, // 댓글 작성 완료
	addCommentError: null, // 댓글 작성 에러
}

/* 더미데이터 */
initialState.mainPosts = initialState.mainPosts.concat(
	Array(20)
		.fill()
		.map(() => ({
			id: nanoid(),
			User: {
				id: nanoid(),
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
const dummyPost = ({ id, content, User }) => ({
	id,
	content,
	User,
	Images: [],
	Comments: [],
})

/* 새 댓글 작성 */
const dummyComment = ({ id, content, User }) => ({
	id,
	content,
	User,
})

/** POST, COMMENT 관련 요청들을 처리한다. */
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
			/* mainPosts에서 action.data.id랑 같은 post 삭제 */
			return createReducer(
				REMOVE_POST_REQUEST,
				{
					mainPosts: state.mainPosts.filter((post) => post.id !== action.data.id),
				},
				initialState,
			)(state, action)
		case ADD_COMMENT_REQUEST:
		case ADD_COMMENT_SUCCESS:
		case ADD_COMMENT_FAILURE:
			/** mainPosts에서 action.data.id와 같은 post를 찾아서
			 * 그 Comments에 새로운 댓글 추가
			 */
			return createReducer(
				ADD_COMMENT_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.id === action.data.id
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
