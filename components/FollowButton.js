import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import { followRequest, unfollowRequest } from '../actions/user'

const FollowButton = ({ post }) => {
	const dispatch = useDispatch()
	const { me, followLoading, unfollowLoading } = useSelector((state) => state.user)
	const isFollowing =
		me && me.Followings.find((following) => following.userId === post.User.userId)
	const onClickButton = useCallback(() => {
		if (isFollowing) {
			dispatch(unfollowRequest({ userId: post.User.userId }))
		} else {
			dispatch(followRequest({ userId: post.User.userId, nickname: post.User.nickname }))
		}
	}, [isFollowing])

	return (
		<Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
			{isFollowing ? '언팔로우' : '팔로우'}
		</Button>
	)
}

FollowButton.propTypes = {
	post: PropTypes.shape({
		postId: PropTypes.string,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
}

export default FollowButton
