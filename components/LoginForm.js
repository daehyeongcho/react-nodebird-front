// 요즘엔 컴포넌트, 컨테이너를 나누는 걸 선호하지 않는다.
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

import useInputs from '../hooks/useInputs'
import { loginRequest } from '../reducers/user'

const ButtonWrapper = styled.div`
	margin-top: 10px;
`
const FormWrapper = styled(Form)`
	padding: 10px;
`

const LoginForm = () => {
	const dispatch = useDispatch()
	const { loginLoading } = useSelector((state) => state.user)
	const [inputs, onChange] = useInputs({
		email: '',
		password: '',
	})
	const { email, password } = inputs

	const onSubmitForm = useCallback(() => {
		// antDesign에서 Form의 onFinish에는 e.preventDefault()가 적용되어있다.
		console.log(email, password)
		dispatch(loginRequest({ email, password }))
	}, [email, password])

	return (
		<>
			<FormWrapper onFinish={onSubmitForm}>
				<div>
					<label htmlFor='email'>이메일</label>
					<br />
					<Input name='email' value={email} onChange={onChange} required />
				</div>
				<div>
					<label htmlFor='password'>비밀번호</label>
					<br />
					<Input name='password' value={password} onChange={onChange} required />
				</div>
				<ButtonWrapper>
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
