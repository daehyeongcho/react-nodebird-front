import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { Input, Menu, Row, Col } from 'antd'

import UserProfile from '../UserProfile/UserProfile' // 왼쪽 상단에 보여 줄 사용자 프로필 폼
import LoginForm from '../LoginForm/LoginForm' // 왼쪽 상단에 보여 줄 로그인 폼
import styles from './AppLayout.module.css'

/** 페이지 레이아웃 컴포넌트
 * - 모든 페이지마다 들어갈 공통 메뉴들 및 레이아웃이 들어있는 컴포넌트
 */
const AppLayout = ({ children }) => {
	const { me } = useSelector((state) => state.user) // 현재 로그인 되어있는 유저 정보

	return (
		<div className={styles.app_layout}>
			<Menu mode='horizontal'>
				{/* 공통 메뉴 */}
				<Menu.Item key={0}>
					<Link href='/'>
						<a>노드버드</a>
					</Link>
				</Menu.Item>
				<Menu.Item key={1}>
					<Link href='/profile'>
						<a>프로필</a>
					</Link>
				</Menu.Item>
				<Menu.Item key={2}>
					<Input.Search className={styles.input_search} enterButton />
				</Menu.Item>
				<Menu.Item key={3}>
					<Link href='/signup'>
						<a>회원가입</a>
					</Link>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				{/* 페이지 레이아웃 */}
				<Col xs={24} md={6}>
					{me ? <UserProfile /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a
						href='https://github.com/daehyeongcho'
						target='_blank'
						rel='noreferrer noopener'
					>
						Made by fosel
					</a>
				</Col>
			</Row>
		</div>
	)
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppLayout
