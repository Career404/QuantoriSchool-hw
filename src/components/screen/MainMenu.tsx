import React, { Children, PropsWithChildren } from 'react'
import styled from 'styled-components'

const MenuScreen = styled.div`
	height: 100%;
	width: 100%;
	padding: 10% 5% 35%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 5%;
	grid-auto-rows: 50px;
	background-color: rgb(178, 151, 0);
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`
const PinnedDiv = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 15%;
	padding: 1% 5%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 5%;
	justify-content: space-evenly;
	align-items: center;
	background-color: #80808085;
	backdrop-filter: blur(5px);
	box-shadow: 0 -3px 5px #80808085;
	& > * {
		flex: 0 0 calc(20%);
	}
`

interface MainMenuProps extends PropsWithChildren {
	pinned: React.ReactNode[]
}

export default function MainMenu({ pinned, children }: MainMenuProps) {
	return (
		<>
			<MenuScreen>
				{children}
				<PinnedDiv>{pinned}</PinnedDiv>
			</MenuScreen>
		</>
	)
}
