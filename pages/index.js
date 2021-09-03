import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AppLayout from '../components/AppLayout/AppLayout' // 공통 메뉴 및 레이아웃
import PostForm from '../components/PostForm/PostForm' // 새 글 쓰기 폼
import PostCard from '../components/PostCard/PostCard' // 기존의 글들을 렌더링하는 컴포넌트
import { loadMyInfoRequest } from '../actions/user'
import { loadPostsRequest } from '../actions/post'

/** 메인 페이지
 * - 로그인 완료 시 글쓰기 창을 띄우고, 밑에 기존 글들을 불러옴.
 */
const Home = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state) => state.user) // 로그인 완료
	const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector(
		(state) => state.post,
	)

	/* 리트윗 에러가 나면 alert. */
	useEffect(() => {
		if (retweetError) {
			alert(retweetError) // eslint-disable-line no-alert
		}
	}, [retweetError])

	useEffect(() => {
		dispatch(loadMyInfoRequest()) // 로그인 된 사용자 정보 불러옴
		dispatch(loadPostsRequest()) // 모든 글들 불러옴
	}, [])

	/* 스크롤 */
	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300 // 스크롤 끝까지 다내리면
			) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id || 0
					console.log('lastId', lastId)
					dispatch(loadPostsRequest({ lastId }))
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [hasMorePosts, loadPostsLoading, mainPosts])

	return (
		<>
			<AppLayout>
				{me && <PostForm />}
				{mainPosts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</AppLayout>
		</>
	)
}

export default Home
