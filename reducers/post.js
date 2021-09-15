import produce from '../utils/produce'

import { reducerWithRequestAndFailure } from '../utils'
import {
	LOAD_POSTS_SUCCESS, // 트윗들 불러오기 성공 액션
	LOAD_USER_POSTS_SUCCESS, // 특정 유저의 트윗들 불러오기 성공 액션
	LOAD_HASHTAG_POSTS_SUCCESS, // 특정 해쉬태그를 가진 트윗들 불러오기 성공 액션
	LOAD_POST_SUCCESS, // 원하는 트윗 불러오기 성공 액션
	ADD_POST_SUCCESS, // 트윗 작성 성공 액션
	EDIT_POST_SUCCESS, // 트윗 수정 성공 액션
	REMOVE_POST_SUCCESS, // 트윗 삭제 성공 액션
	UPLOAD_IMAGES_SUCCESS, // 이미지 업로드 성공 액션
	LIKE_POST_SUCCESS, // 좋아요 성공 액션
	UNLIKE_POST_SUCCESS, // 좋아요 해제 성공 액션
	RETWEET_SUCCESS, // 리트윗 성공 액션
	ADD_COMMENT_SUCCESS, // 댓글 작성 성공 액션
	OPEN_EDIT_FORM, // 수정 폼에 이미지 추가하기 액션
	CLOSE_EDIT_FORM, // 수정 폼 닫을 때 이미지 삭제하기 액션
	REMOVE_IMAGE, // 수정/새글 작성 폼에 이미지 삭제 액션
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
	loadUserPostsLoading: false, // 특정 유저의 트윗들 불러오기 시도 중
	loadUserPostsDone: false, // 특정 유저의 트윗들 불러오기 완료
	loadUserPostsError: null, // 특정 유저의 트윗들 불러오기 에러
	loadHashtagPostsLoading: false, // 특정 해쉬태그를 가진 트윗들 불러오기 시도 중
	loadHashtagPostsDone: false, // 특정 해쉬태그를 가진 트윗들 불러오기 완료
	loadHashtagPostsError: null, // 특정 해쉬태그를 가진 트윗들 불러오기 에러
	loadPostLoading: false, // 원하는 트윗 불러오기 시도 중
	loadPostDone: false, // 원하는 트윗 불러오기 완료
	loadPostError: null, // 원하는 트윗 불러오기 에러
	addPostLoading: false, // 트윗 작성 시도 중
	addPostDone: false, // 트윗 작성 완료
	addPostError: null, // 트윗 작성 에러
	editPostLoading: false, // 트윗 수정 시도 중
	editPostDone: false, // 트윗 수정 완료
	editPostError: null, // 트윗 수정 에러
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
const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LOAD_POSTS_SUCCESS: // mainPosts에 action.data 추가
				draft.loadPostsLoading = false
				draft.loadPostsDone = true
				draft.mainPosts = draft.mainPosts.concat(action.data)
				draft.hasMorePosts = action.data.length === 10 // 불러온 글이 10개가 안되면 더 이상 불러올게 없다고 판단
				break
			case LOAD_USER_POSTS_SUCCESS: // mainPosts에 action.data 추가
				draft.loadUserPostsLoading = false
				draft.loadUserPostsDone = true
				draft.mainPosts = draft.mainPosts.concat(action.data)
				draft.hasMorePosts = action.data.length === 10 // 불러온 글이 10개가 안되면 더 이상 불러올게 없다고 판단
				break
			case LOAD_HASHTAG_POSTS_SUCCESS: // mainPosts에 action.data 추가
				draft.loadHashtagPostsLoading = false
				draft.loadHashtagPostsDone = true
				draft.mainPosts = draft.mainPosts.concat(action.data)
				draft.hasMorePosts = action.data.length === 10 // 불러온 글이 10개가 안되면 더 이상 불러올게 없다고 판단
				break
			case LOAD_POST_SUCCESS: // singlePost에 action.data 추가
				draft.loadPostLoading = false
				draft.loadPostDone = true
				draft.singlePost = action.data
				break
			case ADD_POST_SUCCESS: // mainPosts 앞에 action.data 추가
				draft.addPostLoading = false
				draft.addPostDone = true
				draft.mainPosts.unshift(action.data)
				draft.imagePaths = []
				break
			case EDIT_POST_SUCCESS: {
				// mainPosts에서 action.data.id 찾아서 action.data 대입
				draft.editPostLoading = false
				draft.editPostDone = true
				const index = draft.mainPosts.findIndex((v) => v.id === action.data.id)
				draft.mainPosts[index] = action.data
				draft.imagePaths = []
				break
			}
			case REMOVE_POST_SUCCESS: // mainPosts에서 action.data.id랑 같은 post 삭제
				draft.removePostLoading = false
				draft.removePostDone = true
				draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.id)
				break
			case UPLOAD_IMAGES_SUCCESS:
				draft.uploadImagesLoading = false
				draft.uploadImagesDone = true
				draft.imagePaths = draft.imagePaths.concat(action.data)
				break
			case LIKE_POST_SUCCESS: {
				/* mainPosts에서 action.data.PostId랑 같은 id의 post를 찾아서 Likers에 action.data.UserEmail 넣어줌 */
				draft.likePostLoading = false
				draft.likePostDone = true
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
				post.Likers.push({ email: action.data.UserEmail })
				break
			}
			case UNLIKE_POST_SUCCESS: {
				draft.unlikePostLoading = false
				draft.unlikePostDone = true
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
				post.Likers = post.Likers.filter((v) => v.email !== action.data.UserEmail)
				break
			}
			case RETWEET_SUCCESS:
				draft.retweetLoading = false
				draft.retweetDone = true
				draft.mainPosts.unshift(action.data)
				break
			case ADD_COMMENT_SUCCESS: {
				/* mainPosts에서 action.data.PostId와 같은 post를 찾아서 그 Comments에 새로운 댓글 추가 */
				draft.addCommentLoading = false
				draft.addCommentDone = true
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
				post.Comments.unshift(action.data)
				break
			}
			case OPEN_EDIT_FORM: // 동기액션이라 action type이 하나면 된다.
				draft.imagePaths = draft.imagePaths.concat(action.data)
				break
			case CLOSE_EDIT_FORM: // 동기액션이라 action type이 하나면 된다.
				draft.imagePaths = []
				break
			case REMOVE_IMAGE:
				draft.imagePaths = draft.imagePaths.filter(
					(v, index) => index !== action.data.index,
				)
				break
			default:
				reducerWithRequestAndFailure(action, draft)
				break
		}
	})

export default reducer
