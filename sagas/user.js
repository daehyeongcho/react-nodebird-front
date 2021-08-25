import { all, fork, takeLatest } from 'redux-saga/effects'

import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	SIGNUP_REQUEST,
	FOLLOW_REQUEST,
	UNFOLLOW_REQUEST,
} from '../reducers/user'
import { createSaga } from '../utils'
import * as API from '../api/user'

const login = createSaga(LOGIN_REQUEST, API.loginAPI)
const logout = createSaga(LOGOUT_REQUEST, API.logoutAPI)
const signup = createSaga(SIGNUP_REQUEST, API.signupAPI)
const follow = createSaga(FOLLOW_REQUEST, API.followAPI)
const unfollow = createSaga(UNFOLLOW_REQUEST, API.unfollowAPI)

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
