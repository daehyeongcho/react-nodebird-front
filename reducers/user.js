// import { nanoid } from 'nanoid'

import { createReducer } from '../utils'

/* 액션 목록 */
import {
	LOAD_MY_INFO_REQUEST, // 로그인 유저 정보 불러오기 요청 액션
	LOAD_MY_INFO_SUCCESS, // 로그인 유저 정보 불러오기 성공 액션
	LOAD_MY_INFO_FAILURE, // 로그인 유저 정보 불러오기 실패 액션
	LOAD_USER_REQUEST, // 유저 정보 불러오기 요청 액션
	LOAD_USER_SUCCESS, // 유저 정보 불러오기 성공 액션
	LOAD_USER_FAILURE, // 유저 정보 불러오기 실패 액션
	LOGIN_REQUEST, // 로그인 요청 액션
	LOGIN_SUCCESS, // 로그인 성공 액션
	LOGIN_FAILURE, // 로그인 실패 액션
	LOGOUT_REQUEST, // 로그아웃 요청 액션
	LOGOUT_SUCCESS, // 로그아웃 성공 액션
	LOGOUT_FAILURE, // 로그아웃 실패 액션
	SIGNUP_REQUEST, // 회원가입 요청 액션
	SIGNUP_SUCCESS, // 회원가입 성공 액션
	SIGNUP_FAILURE, // 회원가입 실패 액션
	CHANGE_NICKNAME_REQUEST, // 회원가입 요청 액션
	CHANGE_NICKNAME_SUCCESS, // 회원가입 성공 액션
	CHANGE_NICKNAME_FAILURE, // 회원가입 실패 액션
	FOLLOW_REQUEST, // 팔로우 요청 액션
	FOLLOW_SUCCESS, // 팔로우 성공 액션
	FOLLOW_FAILURE, // 팔로우 실패 액션
	UNFOLLOW_REQUEST, // 언팔로우 요청 액션
	UNFOLLOW_SUCCESS, // 언팔로우 성공 액션
	UNFOLLOW_FAILURE, // 언팔로우 실패 액션
	REMOVE_FOLLOWER_REQUEST, // 팔로워 차단 요청 액션
	REMOVE_FOLLOWER_SUCCESS, // 팔로워 차단 성공 액션
	REMOVE_FOLLOWER_FAILURE, // 팔로워 차단 실패 액션
	LOAD_FOLLOWERS_REQUEST, // 팔로워 불러오기 요청 액션
	LOAD_FOLLOWERS_SUCCESS, // 팔로워 불러오기 성공 액션
	LOAD_FOLLOWERS_FAILURE, // 팔로워 불러오기 실패 액션
	LOAD_FOLLOWINGS_REQUEST, // 팔로잉 불러오기 요청 액션
	LOAD_FOLLOWINGS_SUCCESS, // 팔로잉 불러오기 성공 액션
	LOAD_FOLLOWINGS_FAILURE, // 팔로잉 불러오기 실패 액션
	ADD_POST_TO_ME, // 새 글 쓰고 user.me.Posts에 추가하는 액션
	REMOVE_POST_OF_ME, // 글 지우고 user.me.Posts에서 지우는 액션
} from '../actions/user'

/** user state 안에 들어있는 property들 */
export const initialState = {
	loadMyInfoLoading: false, // 로그인 유저 정보 불러오기 시도 중
	loadMyInfoDone: false, // 로그인 유저 정보 불러오기 완료
	loadMyInfoError: null, // 로그인 유저 정보 불러오기 에러
	loadUserLoading: false, // 로그인 유저 정보 불러오기 시도 중
	loadUserDone: false, // 로그인 유저 정보 불러오기 완료
	loadUserError: null, // 로그인 유저 정보 불러오기 에러
	logoutLoading: false, // 로그아웃 시도 중
	logoutDone: false, // 로그아웃 완료
	logoutError: null, // 로그아웃 에러
	signupLoading: false, // 회원가입 시도 중
	signupDone: false, // 회원가입 완료
	signupError: null, // 회원가입 에러
	changeNicknameLoading: false, // 회원가입 시도 중
	changeNicknameDone: false, // 회원가입 완료
	changeNicknameError: null, // 회원가입 에러
	followLoading: false, // 팔로우 시도 중
	followDone: false, // 팔로우 완료
	followError: null, // 팔로우 에러
	unfollowLoading: false, // 언팔로우 시도 중
	unfollowDone: false, // 언팔로우 완료
	unfollowError: null, // 언팔로우 에러
	removeFollowerLoading: false, // 팔로워 차단 시도 중
	removeFollowerDone: false, // 팔로워 차단 완료
	removeFollowerError: null, // 팔로워 차단 에러
	loadFollowersLoading: false, // 팔로워 불러오기 시도 중
	loadFollowersDone: false, // 팔로워 불러오기 완료
	loadFollowersError: null, // 팔로워 불러오기 에러
	loadFollowingsLoading: false, // 팔로잉 불러오기 시도 중
	loadFollowingsDone: false, // 팔로잉 불러오기 완료
	loadFollowingsError: null, // 팔로잉 불러오기 에러
	me: null, // 로그인 되어있는 유저 정보
	userInfo: null, // 불러올 사용자 정보
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_MY_INFO_REQUEST:
		case LOAD_MY_INFO_SUCCESS:
		case LOAD_MY_INFO_FAILURE:
			/* user.me에 로그인 된 유저 정보 추가 */
			return createReducer(
				LOAD_MY_INFO_REQUEST,
				{ me: action.data },
				initialState,
			)(state, action)
		case LOAD_USER_REQUEST:
		case LOAD_USER_SUCCESS:
		case LOAD_USER_FAILURE:
			/* user.userInfo에 사용자 정보 추가 */
			return createReducer(
				LOAD_USER_REQUEST,
				{
					userInfo: action.data,
				},
				initialState,
			)(state, action)
		case LOGIN_REQUEST:
		case LOGIN_SUCCESS:
		case LOGIN_FAILURE:
			/* user.me에 {email, password} 추가 */
			return createReducer(LOGIN_REQUEST, { me: action.data }, initialState)(state, action)
		case LOGOUT_REQUEST:
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			/* user.me 비워줌 */
			return createReducer(LOGOUT_REQUEST, { me: null }, initialState)(state, action)
		case SIGNUP_REQUEST:
		case SIGNUP_SUCCESS:
		case SIGNUP_FAILURE:
			return createReducer(SIGNUP_REQUEST, null, initialState)(state, action)
		case CHANGE_NICKNAME_REQUEST:
		case CHANGE_NICKNAME_SUCCESS:
		case CHANGE_NICKNAME_FAILURE:
			/* user.me.nickname 변경 */
			return createReducer(
				CHANGE_NICKNAME_REQUEST,
				{
					me: {
						...state.me,
						nickname: action.data.nickname,
					},
				},
				initialState,
			)(state, action)
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
							{ email: action.data.email, nickname: action.data.nickname },
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
							(following) => following.email !== action.data.email,
						),
					},
				},
				initialState,
			)(state, action)
		case REMOVE_FOLLOWER_REQUEST:
		case REMOVE_FOLLOWER_SUCCESS:
		case REMOVE_FOLLOWER_FAILURE:
			/* user.me.Followers에서 팔로워 삭제 */
			return createReducer(
				REMOVE_FOLLOWER_REQUEST,
				{
					me: {
						...state.me,
						Followers: state.me.Followers.filter(
							(follower) => follower.email !== action.data.email,
						),
					},
				},
				initialState,
			)(state, action)
		case LOAD_FOLLOWERS_REQUEST:
		case LOAD_FOLLOWERS_SUCCESS:
		case LOAD_FOLLOWERS_FAILURE:
			return createReducer(
				LOAD_FOLLOWERS_REQUEST,
				{
					me: {
						...state.me,
						Followers: action.data,
					},
				},
				initialState,
			)(state, action)
		case LOAD_FOLLOWINGS_REQUEST:
		case LOAD_FOLLOWINGS_SUCCESS:
		case LOAD_FOLLOWINGS_FAILURE:
			return createReducer(
				LOAD_FOLLOWINGS_REQUEST,
				{
					me: {
						...state.me,
						Followings: action.data,
					},
				},
				initialState,
			)(state, action)
		case ADD_POST_TO_ME:
			/* 댓글 작성 성공 시 user.me.Posts에 추가 */
			return {
				...state,
				me: { ...state.me, Posts: [{ id: action.data.id }, ...state.me.Posts] },
			}
		case REMOVE_POST_OF_ME:
			/* 댓글 삭제 성공 시 user.me.Posts에서 삭제 */
			return {
				...state,
				me: {
					...state.me,
					Posts: state.me.Posts.filter((post) => post.id !== action.data.id),
				},
			}
		default:
			return state
	}
}

export default reducer
