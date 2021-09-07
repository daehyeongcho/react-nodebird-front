import { all, fork, put, takeLatest, call } from 'redux-saga/effects'

import {
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	CHANGE_NICKNAME_REQUEST,
	CHANGE_NICKNAME_SUCCESS,
	CHANGE_NICKNAME_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	REMOVE_FOLLOWER_REQUEST,
	REMOVE_FOLLOWER_SUCCESS,
	REMOVE_FOLLOWER_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_SUCCESS,
	LOAD_FOLLOWERS_FAILURE,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_SUCCESS,
	LOAD_FOLLOWINGS_FAILURE,
} from '../actions/user'
import * as API from '../api/user'
import { camelize } from '../utils'

const requestActionTypes = [
	LOAD_MY_INFO_REQUEST,
	LOAD_USER_REQUEST,
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	SIGNUP_REQUEST,
	CHANGE_NICKNAME_REQUEST,
	FOLLOW_REQUEST,
	UNFOLLOW_REQUEST,
	REMOVE_FOLLOWER_REQUEST,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWINGS_REQUEST,
]
const workers = {}

/* LOAD_MY_INFO_REQUEST 액션 처리 */
workers.loadMyInfo = function* loadMyInfo() {
	try {
		const result = yield call(API.loadMyInfoAPI)
		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOAD_USER_REQUEST 액션 처리 */
workers.loadUser = function* loadUser(action) {
	try {
		const result = yield call(API.loadUserAPI, action.data)
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: LOAD_USER_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOGIN_REQUEST 액션 처리 */
workers.login = function* login(action) {
	try {
		const result = yield call(API.loginAPI, action.data)
		yield put({
			type: LOGIN_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: LOGIN_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOGOUT_REQUEST 액션 처리 */
workers.logout = function* logout() {
	try {
		yield call(API.logoutAPI)
		yield put({
			type: LOGOUT_SUCCESS,
		})
	} catch (err) {
		yield put({
			type: LOGOUT_FAILURE,
			error: err.response.data,
		})
	}
}

/* SIGNUP_REQUEST 액션 처리 */
workers.signup = function* signup(action) {
	try {
		yield call(API.signupAPI, action.data)
		yield put({
			type: SIGNUP_SUCCESS,
		})
	} catch (err) {
		yield put({
			type: SIGNUP_FAILURE,
			error: err.response.data,
		})
	}
}

/* CHANGE_NICKNAME_SUCCESS 액션 처리 */
workers.changeNickname = function* changeNickname(action) {
	try {
		const result = yield call(API.changeNicknameAPI, action.data)
		yield put({
			type: CHANGE_NICKNAME_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: CHANGE_NICKNAME_FAILURE,
			error: err.response.data,
		})
	}
}

/* FOLLOW_REQUEST 액션 처리 */
workers.follow = function* follow(action) {
	try {
		const result = yield call(API.followAPI, action.data)
		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response.data,
		})
	}
}

/* UNFOLLOW_REQUEST 액션 처리 */
workers.unfollow = function* unfollow(action) {
	try {
		const result = yield call(API.unfollowAPI, action.data)
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: err.response.data,
		})
	}
}

/* REMOVE_FOLLOWER_REQUEST 액션 처리 */
workers.removeFollower = function* removeFollower(action) {
	try {
		const result = yield call(API.removeFollowerAPI, action.data)
		yield put({
			type: REMOVE_FOLLOWER_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: REMOVE_FOLLOWER_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOAD_FOLLOWERS_REQUEST 액션 처리 */
workers.loadFollowers = function* loadFollowers(action) {
	try {
		const result = yield call(API.loadFollowersAPI, action.data)
		yield put({
			type: LOAD_FOLLOWERS_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: LOAD_FOLLOWERS_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOAD_FOLLOWINGS_REQUEST 액션 처리 */
workers.loadFollowings = function* loadFollowings(action) {
	try {
		const result = yield call(API.loadFollowingsAPI, action.data)
		yield put({
			type: LOAD_FOLLOWINGS_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: LOAD_FOLLOWINGS_FAILURE,
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

/* watcher들 일괄적으로 fork함 */
export default function* userSaga() {
	yield all(Object.values(watchers).map((watcher) => fork(watcher)))
}
