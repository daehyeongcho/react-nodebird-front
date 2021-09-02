/** action type */
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST'
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS'
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE'

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST'
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS'
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

/** action creator
 * - 한번씩만 쓰이는 액션들이라 이렇게 따로 정의안하고
 *   즉석에서 디스패치해도 상관 없다.
 * - success, failure 액션은 saga가 알아서 호출해줌
 */
export const loadMyInfoRequest = () => ({
	type: LOAD_MY_INFO_REQUEST,
})
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
export const changeNicknameRequest = (data) => ({
	type: CHANGE_NICKNAME_REQUEST,
	data,
})
export const followRequest = (data) => ({
	type: FOLLOW_REQUEST,
	data,
})
export const unfollowRequest = (data) => ({
	type: UNFOLLOW_REQUEST,
	data,
})
export const removeFollowerRequest = (data) => ({
	type: REMOVE_FOLLOWER_REQUEST,
	data,
})
export const loadFollowersRequest = () => ({
	type: LOAD_FOLLOWERS_REQUEST,
})
export const loadFollowingsRequest = () => ({
	type: LOAD_FOLLOWINGS_REQUEST,
})
