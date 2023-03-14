import React, { PropsWithChildren } from 'react'
import styled, { keyframes } from 'styled-components'
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
	user-select: none;
	color: #ffffff;
	background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
	background-position: 0;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: ${swipeTextAnim} 6s infinite linear;
`
const LockIcon = styled.div`
	height: 1.5rem;
	width: 1.5rem;
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
	return (
		<Full style={{ backgroundImage: bg, backgroundColor: bgColor }}>
			{children}
			<LockDiv>
				<LockIcon />
				<LockText>Swipe to unlock</LockText>
			</LockDiv>
		</Full>
	)
}
