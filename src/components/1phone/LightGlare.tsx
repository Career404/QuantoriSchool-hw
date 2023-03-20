import React from 'react'
import styled from 'styled-components'

const FullScreenContainer = styled.div`
	pointer-events: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
`
const Light = styled.div`
	display: block;
	width: 100vw;
	height: 200vh;
	transform: rotate(25deg) translate(-80%, -20%);
	background: rgba(255, 255, 255, 0.18);
	filter: blur(25px);
`

export default function LightGlare() {
	return (
		<FullScreenContainer>
			<Light />
		</FullScreenContainer>
	)
}
