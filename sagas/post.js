import { nanoid } from 'nanoid'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

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
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../actions/user'
// import * as API from '../api/post'

/* 트윗 작성 요청 처리 */
function* addPost(action) {
	try {
		// const result = yield call(API.addPostAPI, action.data)
		yield delay(1000)
		const postId = nanoid()
		yield put({
			type: ADD_POST_SUCCESS,
			data: { postId, ...action.data },
		})
		yield put({
			type: ADD_POST_TO_ME,
			data: { postId },
		})
	} catch (err) {
		yield put({
			type: ADD_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 트윗 삭제 요청 처리 */
function* removePost(action) {
	try {
		// const result = yield call(API.removeCommentAPI)
		yield delay(1000)
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		})
		yield put({
			type: REMOVE_POST_OF_ME,
			data: action.data,
		})
	} catch (err) {
		yield put({
			type: REMOVE_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 댓글 작성 요청 처리 */
function* addComment(action) {
	try {
		// const result = yield call(API.addCommentAPI, action.data)
		yield delay(1000)
		const commentId = nanoid()
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: { commentId, ...action.data },
		})
	} catch (err) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: err.response.data,
		})
	}
}

/* 요청 리스너 */
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, removePost)
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
	yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)])
}
