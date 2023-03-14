import React from 'react'
import styled from 'styled-components'
import lockBG from '../../assets/diagmonds.png'

const Full = styled.div`
	height: 100%;
	width: 100%;
`
interface LockProps {
	bg?: React.CSSProperties['backgroundImage']
	bgColor?: React.CSSProperties['backgroundColor']
	children?: React.ReactNode
}

export default function LockedScreen({
	bg = `url(${lockBG})`,
	bgColor = 'rgb(178, 151, 0) ',
	children,
}: LockProps) {
	return (
		<Full style={{ backgroundImage: bg, backgroundColor: bgColor }}>
			{children}
		</Full>
	)
}
