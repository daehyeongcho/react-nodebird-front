import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from 'antd'

import { useInput } from '../../hooks/useInputs'
import { changeNicknameRequest } from '../../actions/user'
import styles from './NicknameEditForm.module.css'

/* 닉네임 수정 폼 */
const NicknameEditForm = () => {
	const dispatch = useDispatch()
	const me = useSelector((state) => state.user?.me)
	const [nickname, onChangeNickname] = useInput(me?.nickname || '')

	const onSubmit = useCallback(() => {
		dispatch(changeNicknameRequest({ nickname }))
	}, [nickname])
	return (
		<Form className={styles.form} onFinish={onSubmit}>
			<Input.Search
				onChange={onChangeNickname}
				addonBefore='닉네임'
				enterButton='수정'
				onSearch={onSubmit}
			/>
		</Form>
	)
}

export default NicknameEditForm
