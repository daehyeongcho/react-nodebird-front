/* eslint-disable no-alert */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import {
	EllipsisOutlined,
	HeartTwoTone,
	HeartOutlined,
	MessageOutlined,
	RetweetOutlined,
} from '@ant-design/icons'
import { Card, Button, Popover, List, Comment } from 'antd'

import PostImages from '../PostImages/PostImages' // 트윗에 첨부된 이미지를 보여주는 폼
import CommentForm from '../CommentForm/CommentForm' // 댓글 작성 폼
import PostCardContent from './PostCardContent' // 본문에 있는 해시태그 처리
import FollowButton from '../FollowButton/FollowButton' // 팔로우/언팔로우 버튼
import {
	likePostRequest,
	unlikePostRequest,
	removePostRequest,
	retweetRequest,
} from '../../actions/post'
import styles from './PostCard.module.css'
import LinkedAvatar from '../_common/LinkedAvatar'

/** PostCard
 * - 트윗 하나를 렌더링하기 위한 컴포넌트
 * - 트윗에 첨부된 이미지, 트윗 작성자 닉네임, 내용 및
 * - 리트윗, 좋아요, 댓글, 기타 버튼들로 구성되어 있다.
 */
const PostCard = ({ post }) => {
	const dispatch = useDispatch()
	const { removePostLoading } = useSelector((state) => state.post) // 트윗 삭제 중 state
	const email = useSelector((state) => state.user.me?.email) // 현재 로그인 되어있는 사용자 email
	const [commentFormOpened, setCommentFormOpened] = useState(false) // 댓글 버튼 누를 때 true

	const onLike = useCallback(() => {
		if (!email) {
			alert('로그인이 필요합니다') // 백엔드에서도 체크하지만 더블체크
			return
		}
		dispatch(likePostRequest({ id: post.id }))
	}, [])
	const onUnlike = useCallback(() => {
		if (!email) {
			alert('로그인이 필요합니다')
			return
		}
		dispatch(unlikePostRequest({ id: post.id }))
	}, [])

	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev)
	}, [])

	/* 삭제 버튼 누를 시 REMOVE_POST_REQUEST 요청 보냄 */
	const onRemovePost = useCallback(() => {
		if (!email) {
			alert('로그인이 필요합니다')
			return
		}
		dispatch(removePostRequest({ id: post.id }))
	}, [])

	/* 리트윗 버튼 누를 시 RETWEET_REQUEST 요청 보냄 */
	const onRetweet = useCallback(() => {
		if (!email) {
			alert('로그인이 필요합니다')
			return
		}
		dispatch(retweetRequest({ id: post.id }))
	}, [email])

	/* post.Comments list 렌더링 */
	const renderComment = useCallback(
		(item) => (
			<li>
				<Comment
					author={item.User.nickname}
					avatar={<LinkedAvatar user={post.Retweet.User} />}
					content={item.content}
				/>
			</li>
		),
		[],
	)

	const liked = post.Likers.find((liker) => liker.email === email) // 로그인한 유저가 좋아요 명단에 있는지 체크

	const retweeted = post.RetweetId && post.User.email === email // 본인이 리트윗한 게시글인지 확인

	return (
		<div className={styles.post_card}>
			<Card
				cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined
						style={{ color: retweeted ? '#08c' : 'none' }}
						key='retweet'
						onClick={onRetweet}
					/>,
					liked ? (
						<HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnlike} />
					) : (
						<HeartOutlined key='heart' onClick={onLike} />
					),
					<MessageOutlined key='comment' onClick={onToggleComment} />,
					<Popover
						key='more'
						content={
							<Button.Group>
								{email && post.User.email === email ? (
									<>
										<Button>수정</Button>
										<Button
											type='danger'
											loading={removePostLoading}
											onClick={onRemovePost}
										>
											삭제
										</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined />
					</Popover>,
				]}
				title={
					post.RetweetId &&
					post.User.email !== email &&
					`${post.User.nickname}님이 리트윗하셨습니다.`
				}
				extra={email && post.User.email !== email ? <FollowButton post={post} /> : null} // 로그인 되어있고 post작성자가 본인이 아니면 팔로우버튼 보여줌
			>
				{post.RetweetId && post.Retweet ? (
					<Card
						cover={
							post.Retweet.Images &&
							post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />
						}
					>
						<Card.Meta
							avatar={<LinkedAvatar user={post.Retweet.User} />}
							title={post.Retweet.User.nickname}
							description={<PostCardContent postData={post.Retweet.content} />}
						/>
					</Card>
				) : (
					<Card.Meta
						avatar={<LinkedAvatar user={post.User} />}
						title={post.User.nickname}
						description={<PostCardContent postData={post.content} />}
					/>
				)}
			</Card>

			{/* 댓글 버튼 누르면 댓글 창 보여줌 */}
			{commentFormOpened && (
				<div>
					{email && <CommentForm post={post} />}
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout='horizontal'
						dataSource={post.Comments}
						renderItem={renderComment}
					/>
				</div>
			)}
		</div>
	)
}

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
		Likers: PropTypes.arrayOf(PropTypes.object),
		RetweetId: PropTypes.number,
		Retweet: PropTypes.object,
	}).isRequired,
}

export default PostCard
