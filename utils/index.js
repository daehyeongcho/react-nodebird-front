import { nanoid } from 'nanoid'
import { delay, put } from 'redux-saga/effects'

import { ADD_POST_TO_ME } from '../actions/user'

/** underscore 형태의 string을 camelCase로 변형
 * - ex. ADD_POST -> addPost
 */
export const camelize = (str) => str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())

/** createReducer
 * - _REQUEST, _SUCCESS, _FAILURE 액션 처리하는 리듀서 생성
 * - ex. 패러미터로 typeRequest에 ADD_POST_REQUEST와 post업데이트를 위한 data가 들어오면
 * - createReducer는 ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE 액션에 대해
 * - addPostLoading, addPostDone, addPostError를 적절히 조작하고,
 * - 나머지 값 변경은 data를 통해 해 줌.
 */
export const createReducer = (typeRequest, data, initialState) => {
	const type = typeRequest.replace('_REQUEST', '') // ADD_POST
	const [typeSuccess, typeFailure] = [`${type}_SUCCESS`, `${type}_FAILURE`] // ADD_POST_SUCCESS, ADD_POST_FAILURE
	const [loading, done, error] = [
		`${camelize(type)}Loading`, // addPostLoading
		`${camelize(type)}Done`, // addPostDone
		`${camelize(type)}Error`, // addPostError
	]

	/* (state, action) => state 형태의 리듀서 함수를 return한다. */
	return (state = initialState, action) => {
		switch (action.type) {
			case typeRequest: // ADD_POST_REQUEST
				console.log(`reducer ${type}`)
				return {
					...state,
					[loading]: true, // ADD_POST를 요청했고 응답 기다리는 중
					[done]: false, // 완료 안됨
					[error]: null, // 에러 없음
				}
			case typeSuccess: // ADD_POST_SUCCESS
				return {
					...state,
					[loading]: false,
					[done]: true, // ADD_POST 완료
					[error]: null,
					...data, // state에 업데이트 될 내용들
				}
			case typeFailure: // ADD_POST_FAILURE
				return {
					...state,
					[loading]: false,
					[done]: false,
					[error]: action.error,
				}
			default:
				return state
		}
	}
}

/** _REQUEST, _SUCCESS, _FAILURE 액션 처리하는 사가 생성
 * - API를 비롯한 비동기 로직들은 모두 여기서 처리된다.
 */
export const createSaga = (typeRequest, api) => {
	console.log(api)
	const type = typeRequest.replace('_REQUEST', '')
	const [typeSuccess, typeFailure] = [`${type}_SUCCESS`, `${type}_FAILURE`]
	return function* saga(action) {
		try {
			console.log(`saga ${typeRequest}`)
			// const result = yield call(api, action.data)
			yield delay(1000)
			const postId = action.data.postId ? action.data.postId : nanoid()
			yield put({
				type: typeSuccess,
				data: { ...action.data, postId },
			})
			if (type === 'ADD_POST') {
				yield put({
					type: ADD_POST_TO_ME,
					data: { postId },
				})
			}
		} catch (err) {
			yield put({
				type: typeFailure,
				error: err.response.data,
			})
		}
	}
}
