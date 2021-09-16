/* /user/[email] */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Card } from 'antd'

import PostCard from '../../components/PostCard/PostCard'
import AppLayout from '../../components/AppLayout/AppLayout'
import wrapper from '../../store/configureStore'
import { loadUserPostsRequest } from '../../_actions/post'
import { loadMyInfoRequest, loadUserRequest } from '../../_actions/user'
import LinkedAvatar from '../../components/common/LinkedAvatar'

/* 특정 유저가 쓴 글들 보여주는 페이지 */
const User = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { email } = router.query
	const { mainPosts, hasMorePosts, loadUserPostsLoading } = useSelector((state) => state.post)
	const { userInfo } = useSelector((state) => state.user)

	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				if (hasMorePosts && !loadUserPostsLoading) {
					dispatch(
						loadUserPostsRequest({
							lastId:
								mainPosts[mainPosts.length - 1] &&
								mainPosts[mainPosts.length - 1].id,
							email,
						}),
					)
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [mainPosts.length, hasMorePosts, loadUserPostsLoading, email])

	return (
		<AppLayout>
			{userInfo && (
				<Head>
					<title>{userInfo.nickname}님의 글</title>
					<meta name='description' content={`${userInfo.nickname}님의 게시글`} />
					<meta property='og:title' content={`${userInfo.nickname}님의 게시글`} />
					<meta property='og:description' content={`${userInfo.nickname}님의 게시글`} />
					<meta property='og:image' content='https://nodebird.com/favicon.ico' />
					<meta property='og:url' content={`https://nodebird.com/user/${email}`} />
				</Head>
			)}
			{userInfo ? (
				<Card
					actions={[
						<div key='twit'>
							트윗
							<br />
							{userInfo.Posts}
						</div>,
						<div key='following'>
							팔로잉
							<br />
							{userInfo.Followings}
						</div>,
						<div key='follower'>
							팔로워
							<br />
							{userInfo.Followers}
						</div>,
					]}
				>
					<Card.Meta
						avatar={<LinkedAvatar user={userInfo} />}
						title={userInfo.nickname}
					/>
				</Card>
			) : null}
			{mainPosts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
	const cookie = req ? req.headers.cookie : ''
	axios.defaults.headers.Cookie = ''
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie
	}
	store.dispatch(loadUserPostsRequest({ email: params.email }))
	store.dispatch(loadMyInfoRequest())
	store.dispatch(loadUserRequest({ email: params.email }))
	store.dispatch(END)
	await store.sagaTask.toPromise()
	return { props: {} }
})

export default User
