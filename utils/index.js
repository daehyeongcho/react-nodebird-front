import { call, put } from 'redux-saga/effects'

// ex. ADD_POST -> addPost
export const camelize = (str) => str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())

/** _REQUEST, _SUCCESS, _FAILURE 액션 처리하는 리듀서 생성
 * data: {[key]: value} 형식으로 넣어줘야 함.
 */
export const createReducer = (typeRequest, data, initialState) => {
	const type = typeRequest.replace('_REQUEST', '')
	const [typeSuccess, typeFailure] = [`${type}_SUCCESS`, `${type}_FAILURE`]
	const [loading, done, error] = [`${camelize(type)}Loading`, `${camelize(type)}Done`, `${camelize(type)}Error`]

	return (state = initialState, action) => {
		switch (action.type) {
			case typeRequest:
				console.log(`reducer ${type}`)
				return {
					...state,
					[loading]: true,
					[done]: false,
					[error]: null,
				}
			case typeSuccess:
				return {
					...state,
					[loading]: false,
					[done]: true,
					...data,
				}
			case typeFailure:
				return {
					...state,
					[loading]: false,
					[error]: action.error,
				}
		}
	}
}

export const createSaga = (typeRequest, api) => {
	const type = typeRequest.replace('_REQUEST', '')
	const [typeSuccess, typeFailure] = [`${type}_SUCCESS`, `${type}_FAILURE`]
	return function* saga(action) {
		try {
			console.log(`saga ${typeRequest}`)
			const result = yield call(api, action.data)
			console.log(result)
			yield put({
				type: typeSuccess,
				data: action.data,
			})
		} catch (err) {
			yield put({
				type: typeFailure,
				error: err.response.data,
			})
		}
	}
}
