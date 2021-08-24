/** 일부 컴포넌트들의 공통 부분은 이렇게 따로 컴포넌트를
 * 만든 다음에 각 컴포넌트를 감싸면 됨
 */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import UserProfile from '../components/UserProfile'
import LoginForm from '../components/LoginForm'

// component에 적용할 땐 styled(component)
// const SearchInput = styled(Input.Search)`
// 	vertical-align: middle;
// `

// gutter 적용 시 최하단에 슬라이더 나타나는 문제 해결
const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
    
    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col::last-child {
        padding-right: 0 !important
    }
`

const AppLayout = ({ children }) => {
	const { me } = useSelector((state) => state.user)
	const style = useMemo(() => ({ verticalAlign: 'middle' }), []) // 리렌더링 방지

	return (
		<div>
			<Global />
			<Menu mode='horizontal'>
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
					<Input.Search style={style} enterButton />
				</Menu.Item>
				<Menu.Item key={3}>
					<Link href='/signup'>
						<a>회원가입</a>
					</Link>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{me ? <UserProfile /> : <LoginForm dummy='zxcbsdf' />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a href='https://github.com/daehyeongcho' target='_blank' rel='noreferrer noopener'>
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
