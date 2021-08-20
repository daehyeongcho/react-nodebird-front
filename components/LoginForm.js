// 요즘엔 컴포넌트, 컨테이너를 나누는 걸 선호하지 않는다.
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
	margin-top: 10px;
`
const FormWrapper = styled(Form)`
	padding: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {
	const [inputs, setInputs] = useState({
		id: '',
		password: '',
	})
	const { id, password } = inputs
	const onChange = useCallback(
		(e) => {
			const { name, value } = e.target
			setInputs({
				...inputs,
				[name]: value,
			})
		},
		[inputs],
	)

	const onSubmitForm = useCallback(() => {
		// antDesign에서 Form의 onFinish에는 e.preventDefault()가 적용되어있다.
		console.log(id, password)
		setIsLoggedIn(true)
	}, [id, password])

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor='id'>아이디</label>
				<br />
				<Input name='id' value={id} onChange={onChange} required />
			</div>
			<div>
				<label htmlFor='password'>비밀번호</label>
				<br />
				<Input name='password' value={password} onChange={onChange} required />
			</div>
			<ButtonWrapper>
				<Button type='primary' htmlType='submit' loading={false}>
					로그인
				</Button>
				<Link href='/signup'>
					<a>
						<Button>회원가입</Button>
					</a>
				</Link>
			</ButtonWrapper>
		</FormWrapper>
	)
}

LoginForm.propTypes = {
	setIsLoggedIn: PropTypes.node.isRequired,
}

export default LoginForm
