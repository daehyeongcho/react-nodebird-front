import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Avatar, Button } from 'antd'

import { logoutRequest } from '../actions/user'

const UserProfile = () => {
	const dispatch = useDispatch()
	const { me, logoutLoading } = useSelector((state) => state.user)
	const onLogout = useCallback(() => {
		dispatch(logoutRequest())
	}, [])

	return (
		<>
			<Card
				actions={[
					<div key='twit'>
						짹짹
						<br />
						{me.Posts.length}
					</div>,
					<div key='followings'>
						팔로잉
						<br />
						{me.Followings.length}
					</div>,
					<div key='followers'>
						팔로워
						<br />
						{me.Followers.length}
					</div>,
				]}
			>
				<Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
				<Button onClick={onLogout} loading={logoutLoading}>
					로그아웃
				</Button>
			</Card>
		</>
	)
}

UserProfile.propTypes = {}

export default UserProfile
