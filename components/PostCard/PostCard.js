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
import { Card, Button, Popover, Avatar, List, Comment } from 'antd'

import PostImages from '../PostImages/PostImages' // 트윗에 첨부된 이미지를 보여주는 폼
import CommentForm from '../CommentForm/CommentForm' // 댓글 작성 폼
import PostCardContent from './PostCardContent' // 본문에 있는 해시태그 처리
import FollowButton from '../FollowButton/FollowButton' // 팔로우/언팔로우 버튼
import { removePostRequest } from '../../actions/post'
import styles from './PostCard.module.css'

/** PostCard
 * - 트윗 하나를 렌더링하기 위한 컴포넌트
 * - 트윗에 첨부된 이미지, 트윗 작성자 닉네임, 내용 및
 * - 리트윗, 좋아요, 댓글, 기타 버튼들로 구성되어 있다.
 */
const PostCard = ({ post }) => {
	const dispatch = useDispatch()
	const { removePostLoading } = useSelector((state) => state.post) // 트윗 삭제 중 state
	const id = useSelector((state) => state.user.me?.id) // 현재 로그인 되어있는 사용자 id
	const [liked, setLiked] = useState(false) // 좋아요 버튼 누를 시 true
	const [commentFormOpened, setCommentFormOpened] = useState(false) // 댓글 버튼 누를 때 true

	const onToggleLike = useCallback(() => {
		setLiked((prev) => !prev)
	}, [])
	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev)
	}, [])

	/* 삭제 버튼 누를 시 REMOVE_POST_REQUEST 요청 보냄 */
	const onRemovePost = useCallback(() => {
		dispatch(removePostRequest({ id: post.id }))
	}, [])

	/* post.Comments list 렌더링 */
	const renderComment = useCallback(
		(item) => (
			<li>
				<Comment
					author={item.User.nickname}
					avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
					content={item.content}
				/>
			</li>
		),
		[],
	)

	return (
		<div className={styles.post_card}>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key='retweet' />,
					liked ? (
						<HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onToggleLike} />
					) : (
						<HeartOutlined key='heart' onClick={onToggleLike} />
					),
					<MessageOutlined key='comment' onClick={onToggleComment} />,
					<Popover
						key='more'
						content={
							<Button.Group>
								{id && post.User.id === id ? (
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
				extra={id && post.User.id !== id ? <FollowButton post={post} /> : null} // 로그인 되어있고 post작성자가 본인이 아니면 팔로우버튼 보여줌
			>
				<Card.Meta
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
					title={post.User.nickname}
					description={<PostCardContent postData={post.content} />}
				/>
			</Card>

			{/* 댓글 버튼 누르면 댓글 창 보여줌 */}
			{commentFormOpened && (
				<div>
					{id && <CommentForm post={post} />}
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
		id: PropTypes.string,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
}

export default PostCard
