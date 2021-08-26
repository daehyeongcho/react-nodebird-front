import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

import useInputs from '../hooks/useInputs'
import { loginRequest } from '../actions/user'

/* 로그인 버튼, 회원가입 버튼 스타일 컴포넌트 */
const ButtonWrapper = styled.div`
	margin-top: 10px;
`

/* 로그인 폼 스타일 컴포넌트 */
const FormWrapper = styled(Form)`
	padding: 10px;
`

/** 로그인 폼
 * - 이메일과 비밀번호를 사용자로부터 받은 다음 이메일 양식을 체크하고 로그인
 */
const LoginForm = () => {
	const dispatch = useDispatch()
	const { loginLoading } = useSelector((state) => state.user) // 로그인 중 state
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

	return (
		<>
			<FormWrapper onFinish={onSubmitForm}>
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
				<ButtonWrapper>
					{/* 로그인 버튼, 회원가입 버튼 공통 */}
					<Button type='primary' htmlType='submit' loading={loginLoading}>
						로그인
					</Button>
					<Link href='/signup'>
						<a>
							<Button>회원가입</Button>
						</a>
					</Link>
				</ButtonWrapper>
			</FormWrapper>
			<div>abcd</div>
		</>
	)
}

LoginForm.propTypes = {}

export default LoginForm
