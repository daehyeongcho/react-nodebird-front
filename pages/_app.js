/** pages들의 공통적인 부분은 _app.js로 빼서 사용 */
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css'

const NodeBird = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<title>NodeBird</title>
			</Head>
			<div>공통 메뉴</div>
			<Component />
		</>
	)
}

NodeBird.propTypes = {
	Component: PropTypes.elementType.isRequired,
}

export default NodeBird
