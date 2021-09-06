// import { nanoid } from 'nanoid'

import { reducerWithRequestAndFailure } from '../utils'
import produce from '../utils/produce'

/* 액션 목록 */
import {
	LOAD_MY_INFO_SUCCESS, // 로그인 유저 정보 불러오기 성공 액션
	LOAD_USER_SUCCESS, // 유저 정보 불러오기 성공 액션
	LOGIN_SUCCESS, // 로그인 성공 액션
	LOGOUT_SUCCESS, // 로그아웃 성공 액션
	SIGNUP_SUCCESS, // 회원가입 성공 액션
	CHANGE_NICKNAME_SUCCESS, // 회원가입 성공 액션
	FOLLOW_SUCCESS, // 팔로우 성공 액션
	UNFOLLOW_SUCCESS, // 언팔로우 성공 액션
	REMOVE_FOLLOWER_SUCCESS, // 팔로워 차단 성공 액션
	LOAD_FOLLOWERS_SUCCESS, // 팔로워 불러오기 성공 액션
	LOAD_FOLLOWINGS_SUCCESS, // 팔로잉 불러오기 성공 액션
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
	loginLoading: false, // 로그인 시도 중
	loginDone: false, // 로그인 완료
	loginError: null, // 로그인 에러
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

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LOAD_MY_INFO_SUCCESS: // user.me에 로그인 된 유저 정보 추가
				draft.loadMyInfoLoading = false
				draft.loadMyInfoDone = true
				draft.me = action.data
				break
			case LOAD_USER_SUCCESS: // user.userInfo에 사용자 정보 추가
				draft.loadUserLoading = false
				draft.loadUserDone = true
				draft.userInfo = action.data
				break
			case LOGIN_SUCCESS: // user.me에 {email, password} 추가
				draft.loginLoading = false
				draft.loginDone = true
				draft.me = action.data
				break
			case LOGOUT_SUCCESS: // user.me 비워줌
				draft.logoutLoading = false
				draft.logoutDone = true
				draft.me = null
				break
			case SIGNUP_SUCCESS:
				draft.signupLoading = false
				draft.signupDone = true
				break
			case CHANGE_NICKNAME_SUCCESS: // user.me.nickname 변경
				draft.changeNicknameLoading = false
				draft.changeNicknameDone = true
				draft.me.nickname = action.data.nickname
				break
			case FOLLOW_SUCCESS: // user.me.Followings에 팔로잉 추가
				draft.followingLoading = false
				draft.followDone = true
				draft.me.Followings.push({
					email: action.data.email,
					nickname: action.data.nickname,
				})
				break
			case UNFOLLOW_SUCCESS: // user.me.Followings에서 팔로잉 삭제
				draft.unfollowLoading = false
				draft.me.unfollowDone = true
				draft.me.Followings = draft.me.Followings.filter(
					(following) => following.email !== action.data.email,
				)
				break
			case REMOVE_FOLLOWER_SUCCESS: // user.me.Followers에서 팔로워 삭제
				draft.removeFollowerLoading = false
				draft.removeFollowerDone = true
				draft.me.Followers = draft.me.Followers.filter(
					(follower) => follower.email !== action.data.email,
				)
				break
			case LOAD_FOLLOWERS_SUCCESS:
				draft.loadFollowersLoading = false
				draft.loadFollowersDone = true
				draft.me.Followers = action.data
				break
			case LOAD_FOLLOWINGS_SUCCESS:
				draft.loadFollowingsLoading = false
				draft.loadFollowingsDone = true
				draft.me.Followings = action.data
				break
			case ADD_POST_TO_ME: // 댓글 작성 성공 시 user.me.Posts에 추가
				draft.me.Posts.unshift({ id: action.data.id })
				break
			case REMOVE_POST_OF_ME: // 댓글 삭제 성공 시 user.me.Posts에서 삭제
				draft.me.Posts = draft.me.Posts.filter((post) => post.id !== action.data.id)
				break
			default:
				reducerWithRequestAndFailure(action, draft)
				break
		}
	})

export default reducer
