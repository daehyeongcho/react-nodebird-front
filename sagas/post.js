import { all, fork, put, takeLatest, call } from 'redux-saga/effects'

import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	UPLOAD_IMAGES_REQUEST,
	UPLOAD_IMAGES_SUCCESS,
	UPLOAD_IMAGES_FAILURE,
	LIKE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	LIKE_POST_FAILURE,
	UNLIKE_POST_REQUEST,
	UNLIKE_POST_SUCCESS,
	UNLIKE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../actions/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../actions/user'
import * as API from '../api/post'

/* 트윗 불러오기 요청 처리 */
function* loadPosts() {
	try {
		const result = yield call(API.loadPostsAPI)
		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: LOAD_POSTS_FAILURE,
			error: err.response.data,
		})
	}
}

/* 트윗 작성 요청 처리 */
function* addPost(action) {
	try {
		const result = yield call(API.addPostAPI, action.data)
		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
		})
		yield put({
			type: ADD_POST_TO_ME,
			data: { id: result.data.id },
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: ADD_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 트윗 삭제 요청 처리 */
function* removePost(action) {
	try {
		const result = yield call(API.removePostAPI, action.data)
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: result.data,
		})
		yield put({
			type: REMOVE_POST_OF_ME,
			data: { id: result.data.id },
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: REMOVE_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 이미지 업로드 요청 처리 */
function* uploadImages(action) {
	try {
		const result = yield call(API.uploadImagesAPI, action.data)
		yield put({
			type: UPLOAD_IMAGES_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: UPLOAD_IMAGES_FAILURE,
			error: err.response.data,
		})
	}
}

/* 좋아요 요청 처리 */
function* likePost(action) {
	try {
		const result = yield call(API.likePostAPI, action.data)
		yield put({
			type: LIKE_POST_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: LIKE_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 좋아요 해제 요청 처리 */
function* unlikePost(action) {
	try {
		const result = yield call(API.unlikePostAPI, action.data)
		yield put({
			type: UNLIKE_POST_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: UNLIKE_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 댓글 작성 요청 처리 */
function* addComment(action) {
	try {
		const result = yield call(API.addCommentAPI, action.data)
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: err.response.data,
		})
	}
}

/* 요청 리스너 */
function* watchLoadPosts() {
	yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, removePost)
}
function* watchUploadImages() {
	yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}
function* watchLikePost() {
	yield takeLatest(LIKE_POST_REQUEST, likePost)
}
function* watchUnlikePost() {
	yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
	yield all([
		fork(watchLoadPosts),
		fork(watchAddPost),
		fork(watchRemovePost),
		fork(watchUploadImages),
		fork(watchLikePost),
		fork(watchUnlikePost),
		fork(watchAddComment),
	])
}
