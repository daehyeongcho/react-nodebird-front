import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { addPostRequest, editPostRequest, removeImage } from '../../_actions/post'
import { useInput } from '../../hooks/useInputs'
import * as postAPI from '../../api/post'
import styles from './PostForm.module.css'

/** PostForm
 * - 트윗 작성 및 수정을 위한 폼
 * - 트윗 본문 입력, 이미지 업로드 버튼, 트윗하기/수정하기 버튼으로 구성
 */
const PostForm = ({
	isEdit = false, // 편집 폼으로 변경
	post = null, // 편집 폼일 때 기존 글 정보
	onToggleEditForm = () => {}, // 편집 폼 여닫는 함수
	initialImagePaths = [], // 편집 폼에서 기존 이미지 저장 경로
}) => {
	const dispatch = useDispatch()
	const { addPostDone, addPostLoading } = useSelector((state) => state.post) // 현재 트윗의 이미지 경로 및 작성완료 state
	const [text, onChangeText, resetText] = useInput(post?.content || '') // 트윗 작성 폼의 본문 state
	const imageInput = useRef() // 이미지 업로드 대화상자
	const [imagePaths, setImagePaths] = useState(initialImagePaths) // 이미지 업로드 경로

	/* 트윗 작성 완료 시 트윗 작성 폼의 내용을 지운다. */
	useEffect(() => {
		if (addPostDone) {
			resetText()
		}
	}, [addPostDone])

	useEffect(() => {
		console.log(imagePaths)
	}, [imagePaths])

	/* 트윗하기 버튼 누를 시 ADD_POST_REQUEST 요청 보냄 */
	const onSubmit = useCallback(() => {
		if (!text || !text.trim()) {
			alert('게시글을 작성하세요.') // eslint-disable-line no-alert
			return
		}

		const formData = new FormData() // 요청 보낼 formData 작성
		imagePaths.forEach((v) => {
			formData.append('image', v)
		})
		formData.append('content', text)

		if (isEdit) {
			// 편집 폼일 땐 EDIT_POST_REQUEST 요청 날리고 편집 폼 닫아줌
			dispatch(editPostRequest(post?.id, formData))
			onToggleEditForm()
		} else {
			// 편집 폼이 아닐 땐 ADD_POST_REQUEST 요청 날리고 imagePaths를 초기화
			dispatch(addPostRequest(formData))
			setImagePaths([])
		}
	}, [isEdit, post, text, onToggleEditForm, imagePaths])

	/* 이미지 업로드 대화상자 띄움 */
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click()
	}, [imageInput.current])

	/* 이미지 업로드 할 때마다 불리는 callback */
	const onChangeImages = useCallback(
		async (e) => {
			try {
				const imageFormData = new FormData()

				/* e.target.files이 array가 아니라 유사배열객체이기 때문 */
				Array.prototype.forEach.call(e.target.files, (file) => {
					imageFormData.append('image', file)
				})
				const result = await postAPI.uploadImagesAPI(imageFormData) // FormData로 axios 요청 보냄
				setImagePaths(imagePaths.concat(result.data)) // 결과로 받은 path array를 기존의 imagePaths에 합침
			} catch (err) {
				console.error(err)
			}
		},
		[imagePaths],
	)

	/* onClick 안에 callback으로 넣어줘야 하기 때문에 고차함수로 작성 */
	const onRemoveImage = useCallback(
		(index) => () => {
			setImagePaths(imagePaths.filter((v, i) => i !== index))
		},
		[imagePaths],
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
				{imagePaths.map((v, index) => (
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
	initialImagePaths: PropTypes.array,
}

export default PostForm
