import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'

import AppLayout from '../components/AppLayout/AppLayout'
import FollowList from '../components/FollowList/FollowList'
import NicknameEditForm from '../components/NicknameEditForm/NicknameEditForm'
import { loadFollowersRequest, loadFollowingsRequest, loadMyInfoRequest } from '../actions/user'
import wrapper from '../store/configureStore'

/** 프로필 페이지
 * - 로그인 되어 있으면 닉네임 변경 폼과 팔로잉, 팔로우 목록을 보여준다.
 */
const Profile = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 유저

	useEffect(() => {
		if (!me?.email) {
			Router.push('/') // 내 정보가 없으면 메인 페이지로
		}
	}, [me?.email])

	useEffect(() => {
		dispatch(loadFollowersRequest())
		dispatch(loadFollowingsRequest())
	}, [])

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				{me ? (
					<>
						<NicknameEditForm />
						<FollowList header='팔로잉 목록' data={me.Followings} />
						<FollowList header='팔로워 목록' data={me.Followers} />
					</>
				) : (
					<></>
				)}
			</AppLayout>
		</>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	console.log(req.headers)
	const cookie = req ? req.headers.cookie : ''
	axios.defaults.headers.Cookie = '' // 서버에서 공유하는 쿠키를 우선 비워주고
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie // 쿠키로 요청이 올때만 (로그인할 때만) 서버에서 쿠키 보냄.
	}

	store.dispatch(loadMyInfoRequest()) // 로그인 된 유저 정보 불러옴

	store.dispatch(END) // REQUEST -> SUCCESS 될 때까지 기다려줌.
	await store.sagaTask.toPromise()
})

export default Profile
