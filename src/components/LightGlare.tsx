import React from 'react'
import styled from 'styled-components'

const FullScreenContainer = styled.div`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
`
const Light = styled.div`
	display: block;
	width: 90vw;
	height: 150vh;
	transform: rotate(25deg) translate(-80%, -20%);
	background: rgba(255, 255, 255, 0.18);
	filter: blur(15px);
`

export default function LightGlare() {
	return (
		<FullScreenContainer>
			<Light />
		</FullScreenContainer>
	)
}
