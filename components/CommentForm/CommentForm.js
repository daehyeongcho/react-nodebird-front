import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Form, Button } from 'antd'

import { useInput } from '../../hooks/useInputs'
import { addCommentRequest } from '../../_actions/post'
import styles from './CommentForm.module.css'

/* 댓글 작성 폼 */
const CommentForm = ({ post }) => {
	const dispatch = useDispatch()
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 사용자 정보
	const { addCommentLoading, addCommentDone } = useSelector((state) => state.post) // 댓글작성 중, 작성완료 state
	const [commentText, onChangeCommentText, resetCommentText] = useInput('') // 댓글 내용 관리를 위한 state

	/* 댓글작성이 완료되면 댓글 창 비움 */
	useEffect(() => {
		if (addCommentDone) {
			resetCommentText()
		}
	}, [addCommentDone])

	/* 댓글작성 버튼 누를 때 ADD_COMMENT_REQUEST 요청 보냄 */
	const onSubmit = useCallback(() => {
		dispatch(
			addCommentRequest({
				content: commentText,
				postId: post.id,
				User: { email: me.email, nickname: me.nickname },
			}),
		)
	}, [addCommentRequest, commentText, post.id])

	return (
		<Form onFinish={onSubmit}>
			<Form.Item>
				<Input.TextArea
					value={commentText}
					onChange={onChangeCommentText}
					rows={4}
					required
				/>
				<div className={styles.loading}>
					<Button
						className={styles.button}
						type='primary'
						htmlType='submit'
						loading={addCommentLoading}
					>
						댓글달기
					</Button>
				</div>
			</Form.Item>
		</Form>
	)
}

CommentForm.propTypes = {
	post: PropTypes.object.isRequired,
}

export default CommentForm
