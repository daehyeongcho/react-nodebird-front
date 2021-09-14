import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { Avatar } from 'antd'

/** 썸네일에 링크가 들어간 Avatar 생성 */
const LinkedAvatar = ({ user }) => (
	<Link href={`/user/${user.email}`} prefetch={false}>
		<a>
			<Avatar>{user.nickname[0]}</Avatar>
		</a>
	</Link>
)

LinkedAvatar.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired,
	}).isRequired,
}

export default LinkedAvatar
