import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import {
	addPostRequest,
	editPostRequest,
	uploadImagesRequest,
	removeImage,
} from '../../actions/post'
import { useInput } from '../../hooks/useInputs'
import styles from './PostForm.module.css'

/** PostForm
 * - 트윗 작성을 위한 폼
 * - 트윗 본문 입력, 이미지 업로드 버튼, 트윗하기 버튼으로 구성
 */
const PostForm = ({ isEdit = false, post = null, onToggleEditForm = () => {} }) => {
	const dispatch = useDispatch()
	const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post) // 현재 트윗의 이미지 경로 및 작성완료 state
	const [text, onChangeText, resetText] = useInput(post?.content || '') // 트윗 작성 폼의 본문 state
	const imageInput = useRef() // 이미지 업로드 대화상자
	const [localImagePaths, setLocalImagePaths] = useState([...imagePaths])

	useEffect(() => {
		setLocalImagePaths([...imagePaths])
	}, [imagePaths])

	/* 트윗 작성 완료 시 트윗 작성 폼의 내용을 지운다. */
	useEffect(() => {
		if (addPostDone) {
			resetText()
		}
	}, [addPostDone])

	/* 트윗하기 버튼 누를 시 ADD_POST_REQUEST 요청 보냄 */
	const onSubmit = useCallback(() => {
		if (!text || !text.trim()) {
			alert('게시글을 작성하세요.') // eslint-disable-line no-alert
			return
		}

		const formData = new FormData()
		localImagePaths.forEach((imagePath) => {
			formData.append('image', imagePath)
		})
		formData.append('content', text)
		if (isEdit) {
			dispatch(editPostRequest(post?.id, formData))
			onToggleEditForm()
		} else {
			dispatch(addPostRequest(formData))
		}
	}, [isEdit, post, text, onToggleEditForm, localImagePaths])

	/* 이미지 업로드 대화상자 띄움 */
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click()
	}, [imageInput.current])

	const onChangeImages = useCallback((e) => {
		console.log('images', e.target.files)
		const imageFormData = new FormData()

		/* e.target.files이 array가 아니라 유사배열객체이기 때문 */
		Array.prototype.forEach.call(e.target.files, (file) => {
			imageFormData.append('image', file)
		})
		dispatch(uploadImagesRequest(imageFormData))
	}, [])

	const onRemoveImage = useCallback(
		(index) => () => {
			dispatch(removeImage({ index }))
		},
		[],
	)

	return (
		<Form className={styles.form} encType='multipart/form-data' onFinish={onSubmit}>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder='어떤 신기한 일이 있었나요?'
				required
			/>
			<div>
				<input
					type='file'
					name='image'
					multiple
					hidden
					ref={imageInput}
					onChange={onChangeImages}
				/>
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				{isEdit && (
					<Button className={styles.btn} onClick={onToggleEditForm}>
						취소
					</Button>
				)}
				<Button
					type='primary'
					className={styles.btn}
					htmlType='submit'
					loading={addPostLoading}
				>
					{isEdit ? '수정하기' : '트윗하기'}
				</Button>
			</div>
			<div>
				{localImagePaths.map((v, index) => (
					<div key={v} className={styles.img_group}>
						<img src={v} alt={v} />
						<div>
							<Button onClick={onRemoveImage(index)}>제거</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	)
}

PostForm.propTypes = {
	isEdit: PropTypes.bool,
	post: PropTypes.object,
	onToggleEditForm: PropTypes.func,
}

export default PostForm
