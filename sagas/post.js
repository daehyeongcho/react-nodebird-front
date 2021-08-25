import { all, fork, takeLatest } from 'redux-saga/effects'

import { ADD_POST_REQUEST, ADD_COMMENT_REQUEST } from '../reducers/post'
import { createSaga } from '../utils'
import * as API from '../api/post'

const addPost = createSaga(ADD_POST_REQUEST, API.addPostAPI)
const addComment = createSaga(ADD_COMMENT_REQUEST, API.addCommentAPI)

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
	yield all([fork(watchAddPost), fork(watchAddComment)])
}
