import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Avatar, Button } from 'antd'

import { logoutUser } from '../reducers/user'

const UserProfile = () => {
	const dispatch = useDispatch()
	const onLogout = useCallback(() => {
		dispatch(logoutUser())
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
				<Card.Meta avatar={<Avatar>RD</Avatar>} title='fosel' />
				<Button onClick={onLogout}>로그아웃</Button>
			</Card>
		</>
	)
}

UserProfile.propTypes = {}

export default UserProfile
