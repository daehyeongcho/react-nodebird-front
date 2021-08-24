import { all, fork, takeLatest, delay, put } from 'redux-saga/effects'
import axios from 'axios'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../reducers/user'

function loginAPI(data) {
	return axios.post('/api/login', data)
}

function logoutAPI() {
	return axios.post('/api/logout')
}

function* login(action) {
	try {
		console.log('saga login')
		// const result = yield call(loginAPI, action.data)
		yield delay(1000)
		yield put({
			type: LOGIN_SUCCESS,
			data: action.data,
		})
	} catch (err) {
		yield put({
			type: LOGIN_FAILURE,
			data: err.response.data,
		})
	}
}

function* logout() {
	try {
		// const result = yield call(logoutAPI)
		yield delay(1000)
		yield put({
			type: LOGOUT_SUCCESS,
			data: null,
		})
	} catch (err) {
		yield put({
			type: LOGOUT_FAILURE,
			data: err.response.data,
		})
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login)
}

function* watchLogout() {
	yield takeLatest(LOGOUT_REQUEST, logout)
}

export default function* userSaga() {
	yield all([fork(watchLogin), fork(watchLogout)])
}
