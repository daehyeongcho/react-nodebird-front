import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'

import wrapper from '../store/configureStore'
import { loadMyInfoRequest } from '../_actions/user'
import { loadRelatedPostsAPI } from '../api/post'

import AppLayout from '../components/AppLayout/AppLayout' // 공통 메뉴 및 레이아웃
import PostForm from '../components/PostForm/PostForm' // 새 글 쓰기 폼
import PostCard from '../components/PostCard/PostCard' // 기존의 글들을 렌더링하는 컴포넌트

/** 메인 페이지
 * - 로그인 완료 시 글쓰기 창을 띄우고, 밑에 기존 글들을 불러옴.
 */
const Related = () => {
	const { me } = useSelector((state) => state.user) // 로그인 완료
	const { hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post)
	const [relatedPosts, setRelatedPosts] = useState([])

	useEffect(async () => {
		const result = await loadRelatedPostsAPI()
		setRelatedPosts(result.data)
	}, [])

	/* 리트윗 에러가 나면 alert. */
	useEffect(() => {
		if (retweetError) {
			alert(retweetError) // eslint-disable-line no-alert
		}
	}, [retweetError])

	/* 스크롤 */
	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300 // 스크롤 끝까지 다내리면
			) {
				if (hasMorePosts) {
					const lastId = relatedPosts[relatedPosts.length - 1]?.id || 0
					console.log('lastId', lastId)
					loadRelatedPostsAPI({ lastId }).then((result) => {
						setRelatedPosts(relatedPosts.concat(result.data))
					})
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [hasMorePosts, loadPostsLoading, relatedPosts])

	return (
		<>
			<AppLayout>
				{me && <PostForm />}
				{relatedPosts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</AppLayout>
		</>
	)
}

/* 여기에 넣어두면 Related보다 먼저 실행됨(SSR) */
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	console.log(req.headers)
	const cookie = req ? req.headers.cookie : ''
	axios.defaults.headers.Cookie = '' // 서버에서 공유하는 쿠키를 우선 비워주고
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie // 쿠키로 요청이 올때만 (로그인할 때만) 서버에서 쿠키 보냄.
	}

	store.dispatch(loadMyInfoRequest()) // 로그인 된 유저 정보 불러옴
	store.dispatch(END) // REQUEST -> SUCCESS 될 때까지 기다려줌.

	await store.sagaTask.toPromise()
})

export default Related
