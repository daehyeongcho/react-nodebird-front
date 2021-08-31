import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout/AppLayout'
import FollowList from '../components/FollowList/FollowList'
import NicknameEditForm from '../components/NicknameEditForm/NicknameEditForm'

/** 프로필 페이지
 * - 로그인 되어 있으면 닉네임 변경 폼과 팔로잉, 팔로우 목록을 보여준다.
 */
const Profile = () => {
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 유저

	useEffect(() => {
		if (!me?.email) {
			Router.push('/') // 내 정보가 없으면 메인 페이지로
		}
	}, [me?.email])

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

export default Profile
