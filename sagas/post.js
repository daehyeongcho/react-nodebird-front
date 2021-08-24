import { all, fork, takeLatest, delay, put } from 'redux-saga/effects'
import axios from 'axios'

import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post'

function addPostAPI(data) {
	return axios.post('/api/addpost', data)
}

function* addPost(action) {
	try {
		// const result = yield call(addPostAPI, action.data)
		yield delay(1000)
		yield put({
			type: ADD_POST_SUCCESS,
			data: null,
		})
	} catch (err) {
		yield put({
			type: ADD_POST_FAILURE,
			data: err.response.data,
		})
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
	yield all([fork(watchAddPost)])
}
