import React from 'react'
import PropTypes from 'prop-types'

const PostImages = ({ images }) => {
	console.log(images)
	return (
		<div>
			<br />
		</div>
	)
}

PostImages.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages