import React from 'react'
import Head from 'next/head'

import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

const Profile = () => {
	const followingList = ['제로초', '바보', '노드버드오피셜', '랜디', '태리'].map((nickname) => ({ nickname }))
	const followerList = ['제로초', '바보', '노드버드오피셜'].map((nickname) => ({ nickname }))

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header='팔로잉 목록' data={followingList} dummy='zxcfqwe' />
				<FollowList header='팔로워 목록' data={followerList} dummy='dummy' />
			</AppLayout>
		</>
	)
}

export default Profile
