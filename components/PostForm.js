import React, { useCallback, useEffect, useRef } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { addPostRequest } from '../actions/post'
import { useInput } from '../hooks/useInputs'

/** PostForm
 * - 트윗 작성을 위한 폼
 * - 트윗 본문 입력, 이미지 업로드 버튼, 트윗하기 버튼으로 구성
 */
const PostForm = () => {
	const dispatch = useDispatch()
	const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post) // 현재 트윗의 이미지 경로 및 작성완료 state
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 유저
	const [text, onChangeText, resetText] = useInput('') // 트윗 작성 폼의 본문 state
	const imageInput = useRef() // 이미지 업로드 대화상자

	/* 트윗 작성 완료 시 트윗 작성 폼의 내용을 지운다. */
	useEffect(() => {
		if (addPostDone) {
			resetText()
		}
	}, [addPostDone])

	/* 트윗하기 버튼 누를 시 ADD_POST_REQUEST 요청 보냄 */
	const onSubmit = useCallback(() => {
		dispatch(
			addPostRequest({ User: { userId: me.userId, nickname: me.nickname }, content: text }),
		)
	}, [text])

	/* 이미지 업로드 대화상자 띄움 */
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click()
	}, [imageInput.current])

	return (
		<Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder='어떤 신기한 일이 있었나요?'
			/>
			<div>
				<input type='file' multiple hidden ref={imageInput} />
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button
					type='primary'
					style={{ float: 'right' }}
					htmlType='submit'
					loading={addPostLoading}
				>
					트윗하기
				</Button>
			</div>
			<div>
				{imagePaths.map((v) => (
					<div key={v} style={{ display: 'inline-block' }}>
						<img src={v} style={{ width: '200px' }} alt={v} />
						<div>
							<Button>제거</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	)
}

export default PostForm
