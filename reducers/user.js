export const initialState = {
	isLoggedIn: false,
	me: null,
	signUpData: {},
	loginData: {},
}

// action creator
export const loginUser = (data) => {
	return {
		type: 'LOGIN_USER',
		data,
	}
}
export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER',
	}
}

// (이전상태, 액션) => 다음상태
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				...state,
				isLoggedIn: true,
				me: action.data,
			}
		case 'LOGOUT_USER':
			return {
				...state,
				isLoggedIn: false,
				me: null,
			}
		default:
			return state
	}
}

export default reducer