import { all, fork, takeLatest, delay } from 'redux-saga/effects'
// import axios from 'axios'

import { LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'
import { createSaga } from '../utils'

const loginAPI = (/*data*/) => delay(1000)
const logoutAPI = () => delay(1000)
const signupAPI = (/*data*/) => delay(1000)
const followAPI = (/*data*/) => delay(1000)
const unfollowAPI = (/*data*/) => delay(1000)

const login = createSaga(LOGIN_REQUEST, loginAPI)
const logout = createSaga(LOGOUT_REQUEST, logoutAPI)
const signup = createSaga(SIGNUP_REQUEST, signupAPI)
const follow = createSaga(FOLLOW_REQUEST, followAPI)
const unfollow = createSaga(UNFOLLOW_REQUEST, unfollowAPI)

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
	yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp), fork(watchFollow), fork(watchUnfollow)])
}
