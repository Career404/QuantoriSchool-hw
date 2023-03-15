import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

import BG from '../../assets/diagmonds.png'

import styled from 'styled-components'

const Full = styled.div`
	height: 100%;
	width: 100%;
`
const MenuScreen = styled.div`
	height: 100%;
	width: 100%;
	padding: 10% 5% 35%;
	display: grid;
	grid-template-columns: repeat(4, 21%);
	column-gap: 5%;
	row-gap: 5%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`
const PinnedDiv = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: calc(45px + 5%);
	padding: 1% 5%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 5%;
	justify-content: space-evenly;
	align-items: center;
	background-color: #80808085;
	backdrop-filter: blur(5px);
	box-shadow: 0 -3px 5px #80808085;
`

interface MainMenuProps extends PropsWithChildren {
	pinned: React.ReactNode[]
	menuBackground?: React.CSSProperties['background']
}

export default function MainMenu({
	pinned,
	menuBackground = `rgb(178, 151, 0) url(${BG})`,
	children,
}: MainMenuProps) {
	const menuRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
	const { events } = useDraggable(menuRef) // Now we pass the reference to the useDraggable hook:

	useEffect(() => console.log(BG), [])
	return (
		<Full style={{ background: menuBackground }}>
			<MenuScreen {...events} ref={menuRef}>
				{children}
			</MenuScreen>
			<PinnedDiv>{pinned}</PinnedDiv>
		</Full>
	)
}
