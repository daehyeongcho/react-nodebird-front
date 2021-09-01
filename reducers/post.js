import { createReducer } from '../utils'
import {
	LOAD_POSTS_REQUEST, // 트윗들 불러오기 요청 액션
	LOAD_POSTS_SUCCESS, // 트윗들 불러오기 성공 액션
	LOAD_POSTS_FAILURE, // 트윗들 불러오기 실패 액션
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
	mainPosts: [],
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

/** POST, COMMENT 관련 요청들을 처리한다. */
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_POSTS_REQUEST:
		case LOAD_POSTS_SUCCESS:
		case LOAD_POSTS_FAILURE:
			return createReducer(
				LOAD_POSTS_REQUEST,
				{ mainPosts: action.data },
				initialState,
			)(state, action)
		case ADD_POST_REQUEST:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
			/* mainPosts에 dummyPost(action.data) 추가 */
			return createReducer(
				ADD_POST_REQUEST,
				{ mainPosts: [action.data, ...state.mainPosts] },
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
			/** mainPosts에서 action.data.PostId와 같은 post를 찾아서
			 * 그 Comments에 새로운 댓글 추가
			 */
			return createReducer(
				ADD_COMMENT_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.id === action.data.PostId
							? {
									...post,
									Comments: [action.data, ...post.Comments],
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
