import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Avatar, Button } from 'antd'

import { logoutRequest } from '../actions/user'

/** UserProfile
 * - 로그인 성공 시 보여줄 유저의 대략적인 정보(트윗 수, 팔로잉 수, 팔로워 수)
 */
const UserProfile = () => {
	const dispatch = useDispatch()
	const { me, logoutLoading } = useSelector((state) => state.user) // 현재 로그인 된 유저의 정보

	/* 로그아웃 버튼 누르면 LOGOUT_REQUEST 요청 보냄 */
	const onLogout = useCallback(() => {
		dispatch(logoutRequest())
	}, [])

	return (
		<>
			<Card
				actions={[
					<div key='twit'>
						트윗
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
