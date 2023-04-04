import React from 'react';
import styled from 'styled-components';

import './DVD.css';
import laserSound from '../../assets/DVD/laser.mp3';
import DVDLogo from '../../assets/DVD/DVDLogo.png';

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
	const handleAnimationIteration = (event: React.AnimationEvent) => {
		if (sound) {
			const audio = new Audio(laserSound);
			audio.play();
		}
	};
	return (
		<Fullscreen onClick={clickCallback}>
			<div
				className="container hasSound"
				onAnimationIteration={handleAnimationIteration}
			>
				<img
					className="DVDLogo hasSound"
					onAnimationIteration={handleAnimationIteration}
					src={DVDLogo}
					alt="DVD logo"
				/>
			</div>
		</Fullscreen>
	);
}
