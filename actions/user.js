/** action type */
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

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

/** action creator
 * - 한번씩만 쓰이는 액션들이라 이렇게 따로 정의안하고
 *   즉석에서 디스패치해도 상관 없다.
 * - success, failure 액션은 saga가 알아서 호출해줌
 */
export const loginRequest = (data) => ({
	type: LOGIN_REQUEST,
	data,
})
export const logoutRequest = () => ({
	type: LOGOUT_REQUEST,
})
export const signupRequest = (data) => ({
	type: SIGNUP_REQUEST,
	data,
})
export const followRequest = () => ({
	type: FOLLOW_REQUEST,
})
export const unfollowRequest = () => ({
	type: UNFOLLOW_REQUEST,
})