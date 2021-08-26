import React from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

/** 프로필 페이지
 * - 로그인 되어 있으면 닉네임 변경 폼과 팔로잉, 팔로우 목록을 보여준다.
 */
const Profile = () => {
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 유저

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
