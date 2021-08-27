import { nanoid } from 'nanoid'

import { createReducer } from '../utils'

/* 액션 목록 */
import {
	LOGIN_REQUEST, // 로그인 요청 액션
	LOGIN_SUCCESS, // 로그인 성공 액션
	LOGIN_FAILURE, // 로그인 실패 액션
	LOGOUT_REQUEST, // 로그아웃 요청 액션
	LOGOUT_SUCCESS, // 로그아웃 성공 액션
	LOGOUT_FAILURE, // 로그아웃 실패 액션
	SIGNUP_REQUEST, // 회원가입 요청 액션
	SIGNUP_SUCCESS, // 회원가입 성공 액션
	SIGNUP_FAILURE, // 회원가입 실패 액션
	FOLLOW_REQUEST, // 팔로우 요청 액션
	FOLLOW_SUCCESS, // 팔로우 성공 액션
	FOLLOW_FAILURE, // 팔로우 실패 액션
	UNFOLLOW_REQUEST, // 언팔로우 요청 액션
	UNFOLLOW_SUCCESS, // 언팔로우 성공 액션
	UNFOLLOW_FAILURE, // 언팔로우 실패 액션
	ADD_POST_TO_ME, // 새 글 쓰고 user.me.Posts에 추가하는 액션
	REMOVE_POST_OF_ME, // 글 지우고 user.me.Posts에서 지우는 액션
} from '../actions/user'

/** user state 안에 들어있는 property들 */
export const initialState = {
	loginLoading: false, // 로그인 시도 중
	loginDone: false, // 로그인 완료
	loginError: null, // 로그인 에러
	logoutLoading: false, // 로그아웃 시도 중
	logoutDone: false, // 로그아웃 완료
	logoutError: null, // 로그아웃 에러
	signupLoading: false, // 회원가입 시도 중
	signupDone: false, // 회원가입 완료
	signupError: null, // 회원가입 에러
	followLoading: false, // 팔로우 시도 중
	followDone: false, // 팔로우 완료
	followError: null, // 팔로우 에러
	unfollowLoading: false, // 언팔로우 시도 중
	unfollowDone: false, // 언팔로우 완료
	unfollowError: null, // 언팔로우 에러
	me: null, // 로그인 되어있는 유저 정보
	signUpData: {}, // 회원가입 폼에 입력한 정보
	loginData: {}, // 로그인 폼에 입력한 정보
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
			/* user.me에 dummyUser 추가 */
			return createReducer(
				LOGIN_REQUEST,
				{ me: dummyUser(action.data) },
				initialState,
			)(state, action)
		case LOGOUT_REQUEST:
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			/* user.me 비워줌 */
			return createReducer(LOGOUT_REQUEST, { me: null }, initialState)(state, action)
		case SIGNUP_REQUEST:
		case SIGNUP_SUCCESS:
		case SIGNUP_FAILURE:
			return createReducer(SIGNUP_REQUEST, null, initialState)(state, action)
		case FOLLOW_REQUEST:
		case FOLLOW_SUCCESS:
		case FOLLOW_FAILURE:
			/* user.me.Followings에 팔로잉 추가 */
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
			/* user.me.Followings에서 팔로잉 삭제 */
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
			/* 댓글 작성 성공 시 user.me.Posts에 추가 */
			return {
				...state,
				me: { ...state.me, Posts: [{ postId: action.data.postId }, ...state.me.Posts] },
			}
		case REMOVE_POST_OF_ME:
			/* 댓글 삭제 성공 시 user.me.Posts에서 삭제 */
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
