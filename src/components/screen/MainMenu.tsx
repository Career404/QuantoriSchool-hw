import React, { PropsWithChildren, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

import styled from 'styled-components'

const MenuScreen = styled.div`
	height: 100%;
	width: 100%;
	padding: 10% 5% 35%;
	display: grid;
	grid-template-columns: repeat(4, 21%);
	gap: 5%;
	grid-auto-rows: 45px;
	background-color: rgb(178, 151, 0);
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
}

export default function MainMenu({ pinned, children }: MainMenuProps) {
	const menuRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
	const { events } = useDraggable(menuRef) // Now we pass the reference to the useDraggable hook:

	return (
		<>
			<MenuScreen {...events} ref={menuRef}>
				{children}
			</MenuScreen>
			<PinnedDiv>{pinned}</PinnedDiv>
		</>
	)
}
