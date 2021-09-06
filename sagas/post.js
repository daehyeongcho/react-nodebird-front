import { all, fork, put, takeLatest, call, throttle } from 'redux-saga/effects'

import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	LOAD_POST_REQUEST,
	LOAD_POST_SUCCESS,
	LOAD_POST_FAILURE,
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
	RETWEET_REQUEST,
	RETWEET_SUCCESS,
	RETWEET_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../actions/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../actions/user'
import * as API from '../api/post'
import { camelize } from '../utils'

const requestActionTypes = [
	LOAD_POSTS_REQUEST,
	LOAD_POST_REQUEST,
	ADD_POST_REQUEST,
	REMOVE_POST_REQUEST,
	UPLOAD_IMAGES_REQUEST,
	LIKE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
	RETWEET_REQUEST,
	ADD_COMMENT_REQUEST,
]

const workers = {}

/* 트윗 불러오기 요청 처리 */
workers.loadPosts = function* loadPosts(action) {
	try {
		const result = yield call(API.loadPostsAPI, action.data)
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

/* 원하는 트윗 하나만 불러오기 요청 처리 */
workers.loadPost = function* loadPost(action) {
	try {
		const result = yield call(API.loadPostAPI, action.data)
		yield put({
			type: LOAD_POST_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: LOAD_POST_FAILURE,
			error: err.response.data,
		})
	}
}

/* 트윗 작성 요청 처리 */
workers.addPost = function* addPost(action) {
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
workers.removePost = function* removePost(action) {
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
workers.uploadImages = function* uploadImages(action) {
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
workers.likePost = function* likePost(action) {
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
workers.unlikePost = function* unlikePost(action) {
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

/* 리트윗 요청 처리 */
workers.retweet = function* retweet(action) {
	try {
		const result = yield call(API.retweetAPI, action.data)
		yield put({
			type: RETWEET_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: RETWEET_FAILURE,
			error: err.response.data,
		})
	}
}

/* 댓글 작성 요청 처리 */
workers.addComment = function* addComment(action) {
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

/** watcher : 리스너 같은 역할
 * function* watchLoadMyInfo() {
 *   yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
 * }
 * 형태의 generator 일괄 생성
 */
const watchers = {}
requestActionTypes.forEach((REQUEST) => {
	const type = REQUEST.replace('_REQUEST', '')
	const workerName = camelize(type)
	watchers[workerName] = function* watcher() {
		yield takeLatest(REQUEST, workers[workerName])
	}
})

/* takeLatest 외에 다른 effect 쓰고 싶으면 재정의해주면 됨 */
watchers.watchLoadPosts = function* watchLoadPosts() {
	yield throttle(5000, LOAD_POSTS_REQUEST, workers.loadPosts)
}

/* watcher들 일괄적으로 fork함 */
export default function* postSaga() {
	yield all(Object.values(watchers).map((watcher) => fork(watcher)))
}
