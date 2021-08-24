export const initialState = {
	isLoggingIn: false, // 로그인 시도 중
	isLoggedIn: false,
	isLoggingOut: false, // 로그아웃 시도 중
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

// action creator
// success, failure 액션은 saga가 알아서 호출해줌
export const loginRequest = (data) => ({
	type: LOGIN_REQUEST,
	data,
})
export const logoutRequest = () => ({
	type: LOGOUT_REQUEST,
})

// (이전상태, 액션) => 다음상태
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			console.log('reducer login')
			return {
				...state,
				isLoggingIn: true,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: true,
				me: { ...action.data, nickname: 'fosel' },
			}
		case LOGIN_FAILURE:
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: false,
			}
		case LOGOUT_REQUEST:
			return {
				...state,
				isLoggingOut: true,
			}
		case LOGOUT_SUCCESS:
			return {
				...state,
				isLoggingOut: false,
				isLoggedIn: false,
				me: null,
			}
		case LOGOUT_FAILURE:
			return {
				...state,
				isLoggingOut: false,
			}
		default:
			return state
	}
}

export default reducer
