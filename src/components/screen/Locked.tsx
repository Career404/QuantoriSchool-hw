
import React, { PropsWithChildren, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Slider from 'react-touch-drag-slider'
import lockBG from '../../assets/diagmonds.png'
import lockIcon from '../../assets/arrow-right.png'

const Full = styled.div`
	height: 100%;
	width: 100%;
`
const LockDiv = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 30%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const LockItemsContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
`
const swipeTextAnim = keyframes`
	0% {
		background-position: 0;
	}
	100% {
		background-position: 100px;
	}
`
const LockText = styled.div`
	position: relative;
	user-select: none;
	transition: ease-out 800ms;
	color: #ffffff;
	font-size: max(22px, 2vh);
	background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
	background-position: 0;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: ${swipeTextAnim} 6s infinite linear;
`
const LockIcon = styled.div`
	height: 20%;
	aspect-ratio: 1/1;
	background-image: url(${lockIcon});
	background-size: contain;
`
interface LockProps extends PropsWithChildren {
	isLocked: boolean
	setIsLockedCallback: Function
	bg?: React.CSSProperties['backgroundImage']
	bgColor?: React.CSSProperties['backgroundColor']
}

export default function LockedScreen({
	isLocked = true,
	setIsLockedCallback,
	bg = `url(${lockBG})`,
	bgColor = 'rgb(178, 151, 0) ',
	children,
}: LockProps) {
	const [swipeTextAnim, setSwipeTextAnim] = useState(false)
	return (
		<Full
			style={{ backgroundImage: bg, backgroundColor: bgColor }}
			onMouseUp={() => setSwipeTextAnim(false)}
		>
			{children}
			<LockDiv>
				<Slider
					activeIndex={1}
					onSlideComplete={(i) => {
						if (i === 0) setIsLockedCallback(false)
					}}
				>
					<div key={'empty'}></div>
					<LockItemsContainer
						key={'LockItems'}
						onMouseDown={() => setSwipeTextAnim(true)}
					>
						<LockIcon />
						<LockText
							style={{
								bottom: swipeTextAnim ? '-500%' : '0',
							}}
						>
							Swipe to unlock
						</LockText>
					</LockItemsContainer>
				</Slider>
			</LockDiv>
		</Full>
	)
}
