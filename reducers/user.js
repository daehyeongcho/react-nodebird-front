import { createReducer } from '../utils'

export const initialState = {
	loginLoading: false, // 로그인 시도 중
	loginDone: false,
	loginError: null,
	logoutLoading: false, // 로그아웃 시도 중
	logoutDone: false,
	logoutError: null,
	signupLoading: false, // 회원가입 시도 중
	signupDone: false,
	signupError: null,
	followLoading: false, // 팔로우 시도 중
	followDone: false,
	followError: null,
	unfollowLoading: false, // 언팔로우 시도 중
	unfollowDone: false,
	unfollowError: null,
	me: null,
	signUpData: {},
	loginData: {},
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

// action creator
// success, failure 액션은 saga가 알아서 호출해줌
export const loginRequest = (data) => ({
	type: LOGIN_REQUEST,
	data,
})
export const logoutRequest = () => ({
	type: LOGOUT_REQUEST,
})
export const signupRequest = () => ({
	type: SIGNUP_REQUEST,
})
export const followRequest = () => ({
	type: FOLLOW_REQUEST,
})
export const unfollowRequest = () => ({
	type: UNFOLLOW_REQUEST,
})

const dummyUser = (data) => ({
	...data,
	nickname: 'fosel',
	id: 1,
	Posts: [],
	Followings: [],
	Followers: [],
})

// (이전상태, 액션) => 다음상태

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case LOGIN_SUCCESS:
		case LOGIN_FAILURE:
			return createReducer(LOGIN_REQUEST, { me: dummyUser(action.data) }, initialState)(state, action)
		case LOGOUT_REQUEST:
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			return createReducer(LOGOUT_REQUEST, null, initialState)
		case SIGNUP_REQUEST:
		case SIGNUP_SUCCESS:
		case SIGNUP_FAILURE:
			return createReducer(SIGNUP_REQUEST, null, initialState)
		case FOLLOW_REQUEST:
		case FOLLOW_SUCCESS:
		case FOLLOW_FAILURE:
			return createReducer(FOLLOW_REQUEST, null, initialState)
		case UNFOLLOW_REQUEST:
		case UNFOLLOW_SUCCESS:
		case UNFOLLOW_FAILURE:
			return createReducer(UNFOLLOW_REQUEST, null, initialState)
		default:
			return state
	}
}

export default reducer
