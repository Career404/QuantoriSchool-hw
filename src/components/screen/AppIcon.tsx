import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const AppIconDiv = styled.div`
	width: 100%;
	aspect-ratio: 1/1;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		box-shadow: 0 0 1px 2px black;
	}
`

interface AppIconProps extends PropsWithChildren {
	background?: React.CSSProperties['background']
}
export default function AppIcon({ background = '#000000b6' }: AppIconProps) {
	return <AppIconDiv style={{ background: background }} />
}
