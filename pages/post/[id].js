/* post [id].js */
import React from 'react'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import AppLayout from '../../components/AppLayout/AppLayout'
import { loadMyInfoRequest } from '../../_actions/user'
import { loadPostRequest } from '../../_actions/post'
import wrapper from '../../store/configureStore'
import PostCard from '../../components/PostCard/PostCard'

const Post = () => {
	const router = useRouter()
	const { id } = router.query
	const { singlePost } = useSelector((state) => state.post)

	if (router.isFallback) {
		return <div>로딩중...</div>
	}

	return (
		<AppLayout>
			{singlePost && (
				<>
					<Head>
						<title>{singlePost.User.nickname}님의 글</title>
						{/* 검색엔진에 추가로 정보 제공 */}
						<meta name='description' content={singlePost.content} />
						<meta
							property='og:title'
							content={`${singlePost.User.nickname}님의 게시글`}
						/>
						<meta property='og:description' content={singlePost.content} />
						<meta property='og:image' content={singlePost.Images[0]?.src} />
						<meta property='og:url' content={`https://nodebird.com/post/${id}`} />
					</Head>
					<PostCard post={singlePost} />
				</>
			)}
		</AppLayout>
	)
}

/** dynamic routing에서 getStaticProps를 쓰려면 무조건 getStaticPaths와 같이 써야 한다.
 * - path의 갯수가 얼마 안될때는 이렇게 미리 만들어두는 것도 괜찮음
 */
// export async function getStaticPaths() {
// 	return {
// 		paths: [
// 			{ params: { id: '1' } },
// 			{ params: { id: '2' } },
// 			{ params: { id: '3' } },
// 			{ params: { id: '4' } },
// 		],
// 		fallback: true, // paths에 없는건 서버로부터 불러옴.
// 	}
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
	const cookie = req ? req.headers.cookie : ''
	axios.defaults.headers.Cookie = '' // 서버에서 공유하는 쿠키를 우선 비워주고
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie // 쿠키로 요청이 올때만 (로그인할 때만) 서버에서 쿠키 보냄.
	}

	store.dispatch(loadMyInfoRequest()) // 로그인 된 유저 정보 불러옴
	store.dispatch(loadPostRequest({ id: params.id }))

	store.dispatch(END) // REQUEST -> SUCCESS 될 때까지 기다려줌.
	await store.sagaTask.toPromise()
})

export default Post
