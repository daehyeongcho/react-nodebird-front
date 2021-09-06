import { createReducer } from '../utils'
import {
	LOAD_POSTS_REQUEST, // 트윗들 불러오기 요청 액션
	LOAD_POSTS_SUCCESS, // 트윗들 불러오기 성공 액션
	LOAD_POSTS_FAILURE, // 트윗들 불러오기 실패 액션
	LOAD_POST_REQUEST, // 원하는 트윗 불러오기 요청 액션
	LOAD_POST_SUCCESS, // 원하는 트윗 불러오기 성공 액션
	LOAD_POST_FAILURE, // 원하는 트윗 불러오기 실패 액션
	ADD_POST_REQUEST, // 트윗 작성 요청 액션
	ADD_POST_SUCCESS, // 트윗 작성 성공 액션
	ADD_POST_FAILURE, // 트윗 작성 실패 액션
	REMOVE_POST_REQUEST, // 트윗 삭제 요청 액션
	REMOVE_POST_SUCCESS, // 트윗 삭제 성공 액션
	REMOVE_POST_FAILURE, // 트윗 삭제 실패 액션
	UPLOAD_IMAGES_REQUEST, // 이미지 업로드 요청 액션
	UPLOAD_IMAGES_SUCCESS, // 이미지 업로드 성공 액션
	UPLOAD_IMAGES_FAILURE, // 이미지 업로드 실패 액션
	LIKE_POST_REQUEST, // 좋아요 요청 액션
	LIKE_POST_SUCCESS, // 좋아요 성공 액션
	LIKE_POST_FAILURE, // 좋아요 실패 액션
	UNLIKE_POST_REQUEST, // 좋아요 해제 요청 액션
	UNLIKE_POST_SUCCESS, // 좋아요 해제 성공 액션
	UNLIKE_POST_FAILURE, // 좋아요 해제 실패 액션
	RETWEET_REQUEST, // 리트윗 요청 액션
	RETWEET_SUCCESS, // 리트윗 성공 액션
	RETWEET_FAILURE, // 리트윗 실패 액션
	ADD_COMMENT_REQUEST, // 댓글 작성 요청 액션
	ADD_COMMENT_SUCCESS, // 댓글 작성 성공 액션
	ADD_COMMENT_FAILURE,
	REMOVE_IMAGE, // 이미지 삭제 액션
} from '../actions/post'

/** post state에 들어있는 property들 */
export const initialState = {
	/* 서버 쪽에서 데이터를 어떤 식으로 보낼 건지 미리 물어봐야 함 */
	mainPosts: [],
	singlePost: null, // 트윗 하나만 불러올 때
	imagePaths: [], // 이미지 업로드 시 경로
	hasMorePosts: true, // 더 불러올 트윗이 있는지
	loadPostsLoading: false, // 트윗들 불러오기 시도 중
	loadPostsDone: false, // 트윗들 불러오기 완료
	loadPostsError: null, // 트윗들 불러오기 에러
	loadPostLoading: false, // 원하는 트윗 불러오기 시도 중
	loadPostDone: false, // 원하는 트윗 불러오기 완료
	loadPostError: null, // 원하는 트윗 불러오기 에러
	addPostLoading: false, // 트윗 작성 시도 중
	addPostDone: false, // 트윗 작성 완료
	addPostError: null, // 트윗 작성 에러
	removePostLoading: false, // 트윗 삭제 시도 중
	removePostDone: false, // 트윗 삭제 완료
	removePostError: null, // 트윗 삭제 에러
	uploadImagesLoading: false, // 트윗 삭제 시도 중
	uploadImagesDone: false, // 트윗 삭제 완료
	uploadImagesError: null, // 트윗 삭제 에러
	likePostLoading: false, // 좋아요 시도 중
	likePostDone: false, // 좋아요 완료
	likePostError: null, // 좋아요 에러
	unlikePostLoading: false, // 좋아요 해제 시도 중
	unlikePostDone: false, // 좋아요 해제 완료
	unlikePostError: null, // 좋아요 해제 에러
	retweetLoading: false, // 리트윗 시도 중
	retweetDone: false, // 리트윗 완료
	retweetError: null, // 리트윗 에러
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
			/** mainPosts에 action.data 추가
			 * action.data가 array or null이기 때문에 spread 하기 전에 검사
			 */
			return createReducer(
				LOAD_POSTS_REQUEST,
				{
					mainPosts: [
						...state.mainPosts,
						...(Array.isArray(action.data) ? action.data : []),
					],
					hasMorePosts: Array.isArray(action.data)
						? action.data.length === 10
						: state.hasMorePosts, // 불러온 글이 10개가 안되면 더이상 불러올게 없다고 판단
				},
				initialState,
			)(state, action)
		/* singlePost에 action.data 추가 */
		case LOAD_POST_REQUEST:
		case LOAD_POST_SUCCESS:
		case LOAD_POST_FAILURE:
			return createReducer(
				LOAD_POST_REQUEST,
				{
					singlePost: action.data,
				},
				initialState,
			)(state, action)
		case ADD_POST_REQUEST:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
			/* mainPosts에 action.data 추가 */
			return createReducer(
				ADD_POST_REQUEST,
				{
					mainPosts: [action.data, ...state.mainPosts],
					imagePaths: [],
				},
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
		case UPLOAD_IMAGES_REQUEST:
		case UPLOAD_IMAGES_SUCCESS:
		case UPLOAD_IMAGES_FAILURE:
			/* */
			return createReducer(
				UPLOAD_IMAGES_REQUEST,
				{
					imagePaths: action.data,
				},
				initialState,
			)(state, action)
		case LIKE_POST_REQUEST:
		case LIKE_POST_SUCCESS:
		case LIKE_POST_FAILURE:
			/* mainPosts에서 action.data.PostId랑 같은 id의 post를 찾아서  Likers에 action.data.UserEmail 넣어줌 */
			return createReducer(
				LIKE_POST_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.id === action.data.PostId
							? {
									...post,
									Likers: [{ email: action.data.UserEmail }, ...post.Likers],
							  }
							: post,
					),
				},
				initialState,
			)(state, action)
		case UNLIKE_POST_REQUEST:
		case UNLIKE_POST_SUCCESS:
		case UNLIKE_POST_FAILURE:
			/* mainPosts에서 action.data.PostId랑 같은 id의 post를 찾아서 Likers에서 action.data.UserEmail에 해당하는 유저 지워줌 */
			return createReducer(
				UNLIKE_POST_REQUEST,
				{
					mainPosts: state.mainPosts.map((post) =>
						post.id === action.data.PostId
							? {
									...post,
									Likers: post.Likers.filter(
										(liker) => liker.email !== action.data.UserEmail,
									),
							  }
							: post,
					),
				},
				initialState,
			)(state, action)
		case RETWEET_REQUEST:
		case RETWEET_SUCCESS:
		case RETWEET_FAILURE:
			return createReducer(
				RETWEET_REQUEST,
				{
					mainPosts: [action.data, ...state.mainPosts],
				},
				initialState,
			)(state, action)
		case ADD_COMMENT_REQUEST:
		case ADD_COMMENT_SUCCESS:
		case ADD_COMMENT_FAILURE:
			/* mainPosts에서 action.data.PostId와 같은 post를 찾아서 그 Comments에 새로운 댓글 추가 */
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
		case REMOVE_IMAGE: // 동기액션이라 action type이 하나면 된다.
			return {
				...state,
				imagePaths: state.imagePaths.filter((v, index) => index !== action.data.index),
			}
		default:
			return state
	}
}

export default reducer
