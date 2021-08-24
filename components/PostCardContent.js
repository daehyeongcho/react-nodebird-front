import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

/** 배열의 index를 key로 사용해도 괜찮은 경우
 * : 배열이 절대로 변경되지 않을 때 (혹은 아주 가끔 변경될 때)
 */
const PostCardContent = ({ postData }) => {
	return (
		<div>
			{postData.split(/(#[^\s#]+)/g).map((v, index) =>
				v.match(/(#[^\s#]+)/g) ? (
					<Link href={`/hashtag/${v.slice(1)}`} key={index}>
						<a>{v}</a>
					</Link>
				) : (
					v
				),
			)}
		</div>
	)
}

PostCardContent.propTypes = {
	postData: PropTypes.string.isRequired,
}

export default PostCardContent
