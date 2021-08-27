import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import { CloseOutlined } from '@ant-design/icons'

import useKeypress from '../../hooks/useKeypress'
import styles from './ImagesZoom.module.css'

/** ImagesZoom
 * - 이미지 눌렀을 때 확대된 상태로 슬라이더로 보여줌
 */
const ImagesZoom = ({ images, onClose }) => {
	const [currentSlide, setCurrentSlide] = useState(0) // 현재 이미지 슬라이드 번호
	useKeypress(27, onClose) // Esc 눌렀을 때 슬라이더 종료

	return (
		<div className={styles.overlay}>
			<header className={styles.header}>
				<h1>상세 이미지</h1>
				{/* 종료 버튼 */}
				<CloseOutlined className={styles.close_button} onClick={onClose} content={'X'} />
			</header>
			<div>
				{/* 이미지 슬라이더 */}
				<div className={styles.slick}>
					<Slick
						initialSlide={0}
						beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
						infinite
						arrows={false}
						slidesToShow={1}
						slidesToScroll={1}
					>
						{images.map((v) => (
							<div className={styles.image} key={v.src}>
								<img src={v.src} alt={v.src} />
							</div>
						))}
					</Slick>
					{/* 현재 이미지 번호 / 총 이미지 숫자 */}
					<div className={styles.indicator}>
						<div>
							{currentSlide + 1} / {images.length}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

ImagesZoom.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object).isRequired,
	onClose: PropTypes.func.isRequired,
}

export default ImagesZoom
