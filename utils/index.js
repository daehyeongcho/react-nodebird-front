// import { nanoid } from 'nanoid'
// import { delay, put } from 'redux-saga/effects'

// import { ADD_POST_TO_ME } from '../_actions/user'

/** underscore 형태의 string을 camelCase로 변형
 * - ex. ADD_POST -> addPost
 */
export const camelize = (str) => str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())

/** reducerWithRequestAndFailure
 * - _REQUEST, _FAILURE 액션 처리
 */
export const reducerWithRequestAndFailure = (action, draft) => {
	const type = action.type.slice(0, -8) // ADD_POST
	const [REQUEST, FAILURE] = [`${type}_REQUEST`, `${type}_FAILURE`] // ADD_POST_REQUEST, ADD_POST_FAILURE
	const [loading, done, error] = [
		`${camelize(type)}Loading`, // addPostLoading
		`${camelize(type)}Done`, // addPostDone
		`${camelize(type)}Error`, // addPostError
	]

	switch (action.type) {
		case REQUEST: // ADD_POST_REQUEST
			draft[loading] = true // ADD_POST를 요청했고 응답 기다리는 중
			draft[done] = false // 완료 안됨
			draft[error] = null // 에러 없음
			break
		case FAILURE: // ADD_POST_FAILURE
			draft[loading] = false
			draft[done] = false
			draft[error] = action.error
			break
		default:
			break
	}
}

/** _REQUEST, _SUCCESS, _FAILURE 액션 처리하는 사가 생성
 * - API를 비롯한 비동기 로직들은 모두 여기서 처리된다.
 */
// export const createSaga = (typeRequest, api) => {
// 	const type = typeRequest.replace('_REQUEST', '')
// 	const [typeSuccess, typeFailure] = [`${type}_SUCCESS`, `${type}_FAILURE`]
// 	return function* saga(action) {
// 		try {
// 			// const result = yield call(api, action.data)
// 			yield delay(1000)
// 			const id = action.data.id ? action.data.id : nanoid()
// 			yield put({
// 				type: typeSuccess,
// 				data: { ...action.data, id },
// 			})
// 			if (type === 'ADD_POST') {
// 				yield put({
// 					type: ADD_POST_TO_ME,
// 					data: { id },
// 				})
// 			}
// 		} catch (err) {
// 			yield put({
// 				type: typeFailure,
// 				error: err.response.data,
// 			})
// 		}
// 	}
// }
