import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Avatar, Button } from 'antd'

import { logoutRequest } from '../reducers/user'

const UserProfile = () => {
	const dispatch = useDispatch()
	const { me, isLoggingOut } = useSelector((state) => state.user)
	const onLogout = useCallback(() => {
		dispatch(logoutRequest())
	}, [])

	return (
		<>
			<Card
				actions={[
					<div key='twit'>
						짹짹
						<br />0
					</div>,
					<div key='followings'>
						팔로잉
						<br />0
					</div>,
					<div key='followers'>
						팔로워
						<br />0
					</div>,
				]}
			>
				<Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title='fosel' />
				<Button onClick={onLogout} loading={isLoggingOut}>
					로그아웃
				</Button>
			</Card>
		</>
	)
}

UserProfile.propTypes = {}

export default UserProfile
