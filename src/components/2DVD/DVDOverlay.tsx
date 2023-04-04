import React from 'react';
import styled from 'styled-components';
const Fullscreen = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: black;
`;

export default function DVDOverlay() {
	return <Fullscreen></Fullscreen>;
}
