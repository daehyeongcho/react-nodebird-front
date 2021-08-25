import React from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

const Profile = () => {
	const { me } = useSelector((state) => state.user)
	// const followingList = ['제로초', '바보', '노드버드오피셜', '랜디', '태리'].map((nickname) => ({ nickname }))
	// const followerList = ['제로초', '바보', '노드버드오피셜'].map((nickname) => ({ nickname }))

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
						<FollowList header='팔로잉 목록' data={me.Followings} dummy='zxcfqwe' />
						<FollowList header='팔로워 목록' data={me.Followers} dummy='dummy' />
					</>
				) : (
					<></>
				)}
			</AppLayout>
		</>
	)
}

export default Profile
