import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'

import { followRequest, unfollowRequest } from '../../actions/user'

/* 팔로우/언팔로우 버튼 */
const FollowButton = ({ post }) => {
	const dispatch = useDispatch()
	const { me, followLoading, unfollowLoading } = useSelector((state) => state.user) // 현재 로그인되어있는 사용자정보 및 팔로우, 언팔로우 대기 정보
	const isFollowing = me && me.Followings.find((following) => following.email === post.User.email) // post의 User가 me의 팔로우 목록에 있는지 확인
	const onClickButton = useCallback(() => {
		if (isFollowing) {
			dispatch(unfollowRequest({ email: post.User.email })) // 팔로워이면 버튼 클릭 시 언팔로우 요청
		} else {
			dispatch(followRequest({ email: post.User.email, nickname: post.User.nickname })) // 팔로워가 아니면 버튼 클릭 시 팔로우 요청
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
		id: PropTypes.string, // post의 아이디
		User: PropTypes.object, // post의 글쓴이
		content: PropTypes.string, // post 내용
		createdAt: PropTypes.object, // post가 언
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
}

export default FollowButton
