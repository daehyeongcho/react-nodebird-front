import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import postSaga from './post'
import userSaga from './user'
import { backURL } from '../config/config'

/* index에 이렇게 설정해두면 saga에서 보내는 axios 요청에 대해 설정 가능 */
axios.defaults.baseURL = backURL // axios 요청 앞에 항상 이 baseURL을 붙인다.
axios.defaults.withCredentials = true // 쿠키 허용

/**
 * fork: 비동기 함수 호출 - 논블로킹
 * call: 동기 함수 호출 - 블로킹
 * takeEvery: while 대체
 * takeLatest: 이미 완료된 건 놔두고 동시에 들어온거에 대해서만.
 *             앞에껀 무시하고 뒤에꺼만
 * - 응답만 뒤에꺼 취소함. 요청까진 취소못함. 그래서 요청은 두번 서버에 가서
 * - 서버에 데이터가 두번 저장. 서버에서 체크해야 함
 * */

export default function* rootSaga() {
	yield all([fork(postSaga), fork(userSaga)])
}
