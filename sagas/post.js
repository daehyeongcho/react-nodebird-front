import { all, fork, takeLatest, delay } from 'redux-saga/effects'
// import axios from 'axios'

import { ADD_POST_REQUEST, ADD_COMMENT_REQUEST } from '../reducers/post'
import { createSaga } from '../utils'

const addPostAPI = (/*data*/) => delay(1000)
const addCommentAPI = (/*data*/) => delay(1000)

const addPost = createSaga(ADD_POST_REQUEST, addPostAPI)
const addComment = createSaga(ADD_COMMENT_REQUEST, addCommentAPI)

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
	yield all([fork(watchAddPost), fork(watchAddComment)])
}
