import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'

import { Form, Input, Checkbox, Button } from 'antd'

import AppLayout from '../components/AppLayout/AppLayout'
import useInputs from '../hooks/useInputs'
import { signupRequest, loadMyInfoRequest } from '../_actions/user'
import wrapper from '../store/configureStore'
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
	const [inputs, onChange] = useInputs({ email: '', nickname: '' }) // email, nickname을 useState로 선언
	const { email, nickname } = inputs
	const [password, setPassword] = useState('') // 비밀번호
	const [passwordCheck, setPasswordCheck] = useState('') // 비밀번호 확인
	const [passwordError, setPasswordError] = useState(false) // 비밀번호와 비밀번호 확인이 서로 다르면 true
	const [term, setTerm] = useState(false) // 약관에 동의하면 true

	/** 비밀번호 부분이 바뀔 때마다 password state에 넣어주고,
	 * 비밀번호와 비밀번호 확인이 서로 같은지 체크한다.
	 */
	const onChangePassword = useCallback(
		(e) => {
			setPassword(e.target.value)
			setPasswordError(e.target.value !== passwordCheck)
		},
		[passwordCheck],
	)

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
			alert('환영합니다.') // eslint-disable-line no-alert
			Router.push('/')
		}

		/* 회원가입 실패하면 팝업 메시지 */
		if (signupError) {
			alert(signupError) // eslint-disable-line no-alert
		}
	}, [signupDone, signupError])

	useEffect(() => {
		if (me?.email) {
			Router.push('/') // 로그인 정보가 존재하면 메인 페이지로
		}
	}, [me?.email])

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
						onChange={onChangePassword}
						type='password'
					/>
					<SubForm
						labelText='비밀번호체크'
						name='passwordCheck'
						value={passwordCheck}
						onChange={onChangePasswordCheck}
						type='password'
						content={
							passwordCheck &&
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	console.log(req.headers)
	const cookie = req ? req.headers.cookie : ''
	axios.defaults.headers.Cookie = '' // 서버에서 공유하는 쿠키를 우선 비워주고
	if (req && cookie) {
		axios.defaults.headers.Cookie = cookie // 쿠키로 요청이 올때만 (로그인할 때만) 서버에서 쿠키 보냄.
	}

	store.dispatch(loadMyInfoRequest()) // 로그인 된 유저 정보 불러옴

	store.dispatch(END) // REQUEST -> SUCCESS 될 때까지 기다려줌.
	await store.sagaTask.toPromise()
})

export default Signup
