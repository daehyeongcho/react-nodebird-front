import { nanoid } from 'nanoid'

import { createReducer } from '../utils'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	ADD_POST_TO_ME,
	REMOVE_POST_OF_ME,
} from '../actions/user'

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

/* 더미 유저 데이터 */
const dummyUser = (data) => ({
	...data,
	nickname: '랜디',
	userId: nanoid(),
	Posts: [],
	Followings: ['제로초', '바보', '노드버드오피셜', '태리', '드림'].map((nickname) => ({
		userId: nanoid(),
		nickname,
	})),
	Followers: ['긴토키', '용사'].map((nickname) => ({
		userId: nanoid(),
		nickname,
	})),
})

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case LOGIN_SUCCESS:
		case LOGIN_FAILURE:
			return createReducer(
				LOGIN_REQUEST,
				{ me: dummyUser(action.data) },
				initialState,
			)(state, action)
		case LOGOUT_REQUEST:
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			return createReducer(LOGOUT_REQUEST, { me: null }, initialState)(state, action)
		case SIGNUP_REQUEST:
		case SIGNUP_SUCCESS:
		case SIGNUP_FAILURE:
			return createReducer(SIGNUP_REQUEST, null, initialState)(state, action)
		case FOLLOW_REQUEST:
		case FOLLOW_SUCCESS:
		case FOLLOW_FAILURE:
			return createReducer(
				FOLLOW_REQUEST,
				{
					me: {
						...state.me,
						Followings: [
							...state.me.Followings,
							{ userId: action.data.userId, nickname: action.data.nickname },
						],
					},
				},
				initialState,
			)(state, action)
		case UNFOLLOW_REQUEST:
		case UNFOLLOW_SUCCESS:
		case UNFOLLOW_FAILURE:
			return createReducer(
				UNFOLLOW_REQUEST,
				{
					me: {
						...state.me,
						Followings: state.me.Followings.filter(
							(following) => following.userId !== action.data.userId,
						),
					},
				},
				initialState,
			)(state, action)
		case ADD_POST_TO_ME:
			return {
				...state,
				me: { ...state.me, Posts: [{ postId: action.data.postId }, ...state.me.Posts] },
			}
		case REMOVE_POST_OF_ME:
			return {
				...state,
				me: {
					...state.me,
					Posts: state.me.Posts.filter((post) => post.postId !== action.data.postId),
				},
			}
		default:
			return state
	}
}

export default reducer
