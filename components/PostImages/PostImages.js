import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'

import ImagesZoom from '../ImagesZoom/ImagesZoom' // 이미지 확대 슬라이더 폼
import styles from './PostImages.module.css'

/** PostImages
 * - 트윗에 첨부되어있는 이미지를 보여줌
 * - 이미지가 1개일 때, 2개일 때, 3개 이상일 때 보여주는 방식이 각각 다르다.
 */
const PostImages = ({ images }) => {
	const [showImagesZoom, setShowImagesZoom] = useState(false) // 이미지 클릭 시 true

	/* 이미지 클릭 시 확대해서 보여줌 */
	const onZoom = useCallback(() => {
		setShowImagesZoom(true)
	}, [])

	/* X버튼 누르면 이미지 슬라이더 종료 */
	const onClose = useCallback(() => {
		setShowImagesZoom(false)
	})

	/* 이미지가 1개일 땐 그 이미지만 보여줌 */

	if (images.length === 1) {
		return (
			<>
				<img role='presentation' src={images[0].src} alt={images[0].src} onClick={onZoom} />
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		)
	}

	/* 이미지가 2개일 땐 50%씩 보여줌 */
	if (images.length === 2) {
		return (
			<>
				{images.map((image) => (
					<img
						key={image.imageId}
						role='presentation'
						className={styles.half_image}
						src={image.src}
						alt={image.src}
						onClick={onZoom}
					/>
				))}
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		)
	}
	return (
		/* 3개 이상일 땐 이미지 하나만 보여주고 나머지는 더보기 버튼 */
		<>
			<div>
				<img
					role='presentation'
					width='50%'
					src={images[0].src}
					alt={images[0].src}
					onClick={onZoom}
				/>
				<div role='presentation' className={styles.load_more} onClick={onZoom}>
					<PlusOutlined />
					<br />
					{images.length - 1}개의 사진 더보기
				</div>
			</div>
			{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
		</>
	)
}

PostImages.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostImages
