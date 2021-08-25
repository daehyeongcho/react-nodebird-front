import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'
import { Input, Form, Button } from 'antd'

import { useInput } from '../hooks/useInputs'
import { addCommentRequest } from '../actions/post'

const CommentForm = ({ post }) => {
	const dispatch = useDispatch()
	const id = useSelector((state) => state.user.me?.id)
	const { addCommentDone } = useSelector((state) => state.post)
	const [commentText, onChangeCommentText, resetCommentText] = useInput('')

	useEffect(() => {
		if (addCommentDone) {
			resetCommentText()
		}
	}, [addCommentDone])

	const onSubmit = useCallback(() => {
		console.log('callback', post.postId, commentText)
		dispatch(addCommentRequest({ content: commentText, postId: post.postId, userId: id }))
	}, [addCommentRequest, commentText, post.postId, id])

	return (
		<Form onFinish={onSubmit}>
			<Form.Item style={{ position: 'relative', margin: 0 }}>
				<Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
				<Button
					style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
					type='primary'
					htmlType='submit'
				>
					삐약
				</Button>
			</Form.Item>
		</Form>
	)
}

CommentForm.propTypes = {
	post: PropTypes.object.isRequired,
}

export default CommentForm
