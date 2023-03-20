import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const MainScreen = styled.div`
	position: relative;
	height: 80%;
	aspect-ratio: 9/16;
	box-shadow: inset 0 0 2px black;
	background-color: rgb(30, 30, 30);
	overflow: hidden;
`

interface ScreenProps extends PropsWithChildren {
	isOn: boolean
}
export default function Screen({ isOn = true, children }: ScreenProps) {
	return <MainScreen>{isOn && children}</MainScreen>
}
