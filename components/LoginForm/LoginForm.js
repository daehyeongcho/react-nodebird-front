import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Input } from 'antd'

import useInputs from '../../hooks/useInputs'
import { loginRequest } from '../../_actions/user'
import styles from './LoginForm.module.css'

/** 로그인 폼
 * - 이메일과 비밀번호를 사용자로부터 받은 다음 이메일 양식을 체크하고 로그인
 */
const LoginForm = () => {
	const dispatch = useDispatch()
	const { loginLoading, loginError } = useSelector((state) => state.user) // 로그인 중 state
	const [inputs, onChange] = useInputs({
		/* 이메일, 비밀번호 입력 state */
		email: '',
		password: '',
	})
	const { email, password } = inputs

	/* 로그인 버튼 눌렀을 때 LOGIN_REQUEST 요청을 보냄 */
	const onSubmitForm = useCallback(() => {
		console.log(email, password)
		dispatch(loginRequest({ email, password }))
		/* antDesign에서 Form의 onFinish에는 e.preventDefault()가 적용되어있다. */
	}, [email, password])

	/* 로그인 실패 메시지 전달 */
	useEffect(() => {
		if (loginError) {
			alert(loginError) // eslint-disable-line no-alert
		}
	}, [loginError])

	return (
		<>
			<Form className={styles.form} onFinish={onSubmitForm}>
				<div>
					<label htmlFor='email'>이메일</label>
					<br />
					<Input name='email' type='email' value={email} onChange={onChange} required />
				</div>
				<div>
					<label htmlFor='password'>비밀번호</label>
					<br />
					<Input
						name='password'
						type='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<div className={styles.btn_group}>
					{/* 로그인 버튼, 회원가입 버튼 공통 */}
					<Button type='primary' htmlType='submit' loading={loginLoading}>
						로그인
					</Button>
					<Link href='/signup' prefetch={false}>
						<a>
							<Button>회원가입</Button>
						</a>
					</Link>
				</div>
			</Form>
		</>
	)
}

LoginForm.propTypes = {}

export default LoginForm
