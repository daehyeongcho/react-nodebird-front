/** pages들의 공통적인 부분은 _app.js로 빼서 사용 */
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css'

import wrapper from '../store/configureStore'

const NodeBird = ({ Component }) => {
	return (
		<>
			{/* Next redux wrapper는 Provider로 감쌀 필요 없다. */}
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

export default wrapper.withRedux(NodeBird)
