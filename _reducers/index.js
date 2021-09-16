import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload
		default:
			return combineReducers({ user, post })(state, action) // 기존 reducer에 case 추가로 집어넣기 위해 이런식으로 확장을 함
	}
}

export default rootReducer
