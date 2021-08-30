import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, Checkbox, Button } from 'antd'

import AppLayout from '../components/AppLayout/AppLayout'
import useInputs from '../hooks/useInputs'
import { signupRequest } from '../actions/user'
import styles from './signup.module.css'

/* 빨간색 에러메시지를 위한 스타일드 컴포넌트 */

/* 회원가입 정보 입력 받는 부분이 공통적인 부분이 많아서 분리. */
const SubForm = ({ labelText, name, value, onChange, type = null, content = null }) => (
	<div>
		<label htmlFor={name}>{labelText}</label>
		<br />
		<Input name={name} value={value} type={type} required onChange={onChange} />
		{content}
	</div>
)

SubForm.propTypes = {
	labelText: PropTypes.string.isRequired, // 빈칸에 들어있는 설명
	name: PropTypes.string.isRequired, // <Input name>
	value: PropTypes.string.isRequired, // <Input value>
	onChange: PropTypes.func.isRequired, // <Input onChange>
	type: PropTypes.string, // <Input type>. 기본값은 null
	content: PropTypes.node, // 입력 창 밑에 들어갈 부분
}
SubForm.defaultProps = {
	type: null,
	content: null,
}

/** 회원가입 페이지
 * - 사용자로부터 이메일, 닉네임, 비밀번호를 받아서
 * - 비밀번호 더블체크를 한 후 약관에 동의하면 회원가입을 시켜줌.
 */
const Signup = () => {
	const dispatch = useDispatch()
	const { signupLoading, signupDone, signupError, me } = useSelector((state) => state.user) // redux 상태 불러옴
	const [inputs, onChange] = useInputs({ email: '', password: '', nickname: '' }) // email, password, nickname을 useState로 선언
	const { email, password, nickname } = inputs
	const [passwordCheck, setPasswordCheck] = useState('') // 비밀번호 확인
	const [passwordError, setPasswordError] = useState(false) // 비밀번호와 비밀번호 확인이 서로 다르면 true
	const [term, setTerm] = useState(false) // 약관에 동의하면 true

	/** 비밀번호 확인 부분이 바뀔 때마다 passwordCheck state에 넣어주고,
	 * 비밀번호와 비밀번호 확인이 서로 같은지 체크한다.
	 */
	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value)
			setPasswordError(e.target.value !== password)
		},
		[password],
	)

	/* 약관 동의에 체크할 때마다 term state에 반영 */
	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked)
	}, [])

	/* 가입하기 버튼 눌렀을 때 */
	const onSubmit = useCallback(() => {
		dispatch(signupRequest({ email, password, nickname })) // SIGNUP_REQUEST 요청 보냄
	}, [email, nickname, password])

	useEffect(() => {
		/* 회원가입 성공하면 메인 페이지로 */
		if (signupDone) {
			Router.push('/')
		}

		/* 회원가입 실패하면 팝업 메시지 */
		if (signupError) {
			alert(signupError) // eslint-disable-line no-alert
		}

		/* 로그인 성공하면 메인 페이지로 */
		if (me && me.id) {
			Router.push('/') // 내 정보가 없으면 메인 페이지로
		}
	}, [signupDone, signupError, me && me.id])

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
								<div className={styles.error_message}>
									비밀번호가 일치하지 않습니다.
								</div>
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
