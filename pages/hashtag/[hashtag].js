/* /user/[id] */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { useRouter } from 'next/router'
import axios from 'axios'

import PostCard from '../../components/PostCard/PostCard'
import AppLayout from '../../components/AppLayout/AppLayout'
import wrapper from '../../store/configureStore'
import { loadHashtagPostsRequest } from '../../actions/post'
import { loadMyInfoRequest } from '../../actions/user'

/* 특정 해쉬태그를 가진 글들만 보여주는 페이지 */
const Hashtag = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { hashtag } = router.query
	const { mainPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector((state) => state.post)

	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				if (hasMorePosts && !loadHashtagPostsLoading) {
					dispatch(
						loadHashtagPostsRequest({
							lastId:
								mainPosts[mainPosts.length - 1] &&
								mainPosts[mainPosts.length - 1].id,
							hashtag,
						}),
					)
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [mainPosts.length, hasMorePosts, loadHashtagPostsLoading, hashtag])

	return (
		<AppLayout>
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
	store.dispatch(loadMyInfoRequest())
	store.dispatch(loadHashtagPostsRequest({ hashtag: params.hashtag }))
	store.dispatch(END)
	await store.sagaTask.toPromise()
})

export default Hashtag
