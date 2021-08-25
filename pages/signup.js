import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, Checkbox, Button } from 'antd'
import styled from 'styled-components'

import AppLayout from '../components/AppLayout'
import useInputs from '../hooks/useInputs'
import { signupRequest } from '../actions/user'

const ErrorMessage = styled.div`
	color: red;
`

const SubForm = ({ labelText, name, value, onChange, type = null, content = null }) => (
	<div>
		<label htmlFor={name}>{labelText}</label>
		<br />
		<Input name={name} value={value} type={type} required onChange={onChange} />
		{content}
	</div>
)

SubForm.propTypes = {
	labelText: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	content: PropTypes.node.isRequired,
}

const Signup = () => {
	const dispatch = useDispatch()
	const { signupLoading } = useSelector((state) => state.user)
	const [inputs, onChange] = useInputs({ email: '', password: '', nickname: '' })

	const [passwordCheck, setPasswordCheck] = useState('')
	const [passwordError, setPasswordError] = useState(false)
	const [term, setTerm] = useState(false)

	const { email, password, nickname } = inputs

	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value)
			setPasswordError(e.target.value !== password)
		},
		[password],
	)
	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked)
	}, [])

	const onSubmit = useCallback(() => {
		console.log(email, nickname, password)
		dispatch(signupRequest({ email, password, nickname }))
	}, [])

	return (
		<>
			<AppLayout>
				<Head>
					<meta charSet='utf-8' />
					<title>회원가입 | NodeBird</title>
				</Head>
				<Form onFinish={onSubmit}>
					<SubForm
						labelText='이메일'
						name='email'
						type='email'
						value={email}
						onChange={onChange}
					/>
					<SubForm
						labelText='닉네임'
						name='nickname'
						value={nickname}
						onChange={onChange}
					/>
					<SubForm
						labelText='비밀번호'
						name='password'
						value={password}
						onChange={onChange}
						type='password'
					/>
					<SubForm
						labelText='비밀번호체크'
						name='passwordCheck'
						value={passwordCheck}
						onChange={onChangePasswordCheck}
						type='password'
						content={
							passwordError && (
								<ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
							)
						}
					/>
					<div>
						<Checkbox name='term' checked={term} onChange={onChangeTerm}>
							약관에 동의합니다.
						</Checkbox>
					</div>
					<div style={{ marginTop: 10 }}>
						<Button
							type='primary'
							htmlType='submit'
							disabled={!term || passwordError}
							loading={signupLoading}
						>
							가입하기
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	)
}

export default Signup
