import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './DVD.css';
import laserSound from '/DVD/laser.mp3';

const Fullscreen = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: black;
`;

interface props {
	clickCallback: React.MouseEventHandler<HTMLDivElement>;
	sound: boolean;
}
export default function DVDOverlay({ clickCallback, sound }: props) {
	useEffect(() => {
		if (sound) {
			const handleAnimationIteration = (event) => {
				const audio = new Audio(laserSound);
				audio.play();
			};
			document.querySelectorAll('.hasSound').forEach((el) => {
				el.addEventListener('animationiteration', handleAnimationIteration);
			});

			return () => {
				document.querySelectorAll('.hasSound').forEach((el) => {
					el.removeEventListener(
						'animationiteration',
						handleAnimationIteration
					);
				});
			};
		}
	}, []);
	return (
		<Fullscreen onClick={clickCallback}>
			<div className="container hasSound">
				<img
					className="DVDLogo hasSound"
					src="/DVD/DVDLogo.png"
					alt="DVD logo"
				/>
			</div>
		</Fullscreen>
	);
}
