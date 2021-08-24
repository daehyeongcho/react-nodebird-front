import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'

import { Overlay, CloseBtn, Global, Header, ImageWrapper, Indicator, SlickWrapper } from './styles'
import useKeypress from '../../hooks/useKeypress'

const ImagesZoom = ({ images, onClose }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	useKeypress(27, onClose) // esc 눌렀을 때 slick 끄기

	return (
		<Overlay>
			<Global />
			<Header>
				<h1>상세 이미지</h1>
				<CloseBtn onClick={onClose}>X</CloseBtn>
			</Header>
			<div>
				<SlickWrapper>
					<Slick
						initialSlide={0}
						beforeChange={(slide) => setCurrentSlide(slide + 1)}
						infinite
						arrows={false}
						slidesToShow={1}
						slidesToScroll={1}
					>
						{images.map((v) => (
							<ImageWrapper key={v.src}>
								<img src={v.src} alt={v.src} />
							</ImageWrapper>
						))}
					</Slick>
					<Indicator>
						<div>
							{(currentSlide % images.length) + 1} / {images.length}
						</div>
					</Indicator>
				</SlickWrapper>
			</div>
		</Overlay>
	)
}

ImagesZoom.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object).isRequired,
	onClose: PropTypes.func.isRequired,
}

export default ImagesZoom
