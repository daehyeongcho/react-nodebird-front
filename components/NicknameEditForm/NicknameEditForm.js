import React from 'react'
import { Form, Input } from 'antd'

import styles from './NicknameEditForm.module.css'

/* 닉네임 수정 폼 */
const NicknameEditForm = () => (
	<Form className={styles.form}>
		<Input.Search addonBefore='닉네임' enterButton='수정' />
	</Form>
)

export default NicknameEditForm
