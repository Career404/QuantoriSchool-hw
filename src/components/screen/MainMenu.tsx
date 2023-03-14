import React from 'react'
import styled from 'styled-components'

const MenuScreen = styled.div`
	height: 100%;
	width: 100%;
	background-color: white;
`

export default function MainMenu() {
	return (
		<MenuScreen>
			<p>Apps</p>
			<p>Pinned Apps</p>
		</MenuScreen>
	)
}
