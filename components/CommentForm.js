import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Input, Form, Button } from 'antd'

import { useInput } from '../hooks/useInputs'

const CommentForm = ({ post }) => {
	const id = useSelector((state) => state.user.me?.id)
	const [commentText, onChangeCommentText] = useInput('')
	const onSubmit = useCallback(() => {
		console.log(post.id, commentText)
	}, [commentText])

	return (
		<Form onFinish={onSubmit}>
			<Form.Item style={{ position: 'relative', margin: 0 }}>
				<Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
				<Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type='primary' htmlType='submit'>
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
