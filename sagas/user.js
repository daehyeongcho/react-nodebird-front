import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
} from '../actions/user'
// import * as API from '../api/user'

/* LOGIN_REQUEST 액션 처리 */
function* login(action) {
	try {
		// const result = yield call(API.loginAPI, action.data)
		yield delay(1000)
		yield put({
			type: LOGIN_SUCCESS,
			data: action.data,
		})
	} catch (err) {
		yield put({
			type: LOGIN_FAILURE,
			error: err.response.data,
		})
	}
}

/* LOGOUT_REQUEST 액션 처리 */
function* logout() {
	try {
		// const result = yield call(API.logoutAPI)
		yield delay(1000)
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
function* signup() {
	try {
		// const result = yield call(API.signupAPI)
		yield delay(1000)
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

/* FOLLOW_REQUEST 액션 처리 */
function* follow(action) {
	try {
		// const result = yield call(API.followAPI, action.data)
		yield delay(1000)
		yield put({
			type: FOLLOW_SUCCESS,
			data: action.data,
		})
	} catch (err) {
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response.data,
		})
	}
}

/* UNFOLLOW_REQUEST 액션 처리 */
function* unfollow(action) {
	try {
		// const result = yield call(API.unfollowAPI, action.data)
		yield delay(1000)
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: action.data,
		})
	} catch (err) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: err.response.data,
		})
	}
}

/* 리스너 */
function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login)
}
function* watchLogout() {
	yield takeLatest(LOGOUT_REQUEST, logout)
}
function* watchSignUp() {
	yield takeLatest(SIGNUP_REQUEST, signup)
}
function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchLogout),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnfollow),
	])
}
