import React from 'react'
import { useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout/AppLayout' // 공통 메뉴 및 레이아웃
import PostForm from '../components/PostForm/PostForm' // 새 글 쓰기 폼
import PostCard from '../components/PostCard/PostCard' // 기존의 글들을 렌더링하는 컴포넌트

/** 메인 페이지
 * - 로그인 완료 시 글쓰기 창을 띄우고, 밑에 기존 글들을 불러옴.
 */
const Home = () => {
	const { loginDone } = useSelector((state) => state.user) // 로그인 완료
	const { mainPosts } = useSelector((state) => state.post) // 메인페이지 포스트 목록

	return (
		<>
			<AppLayout>
				{loginDone && <PostForm />}
				{mainPosts.map((post) => (
					<PostCard key={post.postId} post={post} />
				))}
			</AppLayout>
		</>
	)
}

export default Home
