import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'

// 함수 두개 합치는건 쉽지 않아서 라이브러리의 도움을 받음
const rootReducer = combineReducers({
	// SSR 때문에 추가한 reducer
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				console.log('HYDRATE', action)
				return { ...state, ...action.payload }
			default:
				return state
		}
	},
	user,
	post,
})

export default rootReducer
