import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import './style.css';

import DVDOverlay from './components/2DVD/DVDOverlay';
import { format } from 'path';

function Main() {
	const [showDVD, setShowDVD] = useState(false);
	const [sound, setSound] = useState(false);
	return (
		<main>
			<h1>Quantori-homework</h1>
			<h2>Dmitry Zhukov</h2>
			<ol>
				<li>
					<a href="src\pages\1phone\1phone.html">Smartphone</a>
				</li>
				<li>
					<a href="#" onClick={() => setShowDVD(true)}>
						DVD Screensaver
					</a>
					<div
						style={{ display: 'inline', marginLeft: '10px' }}
						onClick={() => setSound(!sound)}
					>
						{sound ? <HiSpeakerWave /> : <HiSpeakerXMark />}
					</div>
				</li>
				<li>
					<a href="src\pages\todo\todo.html">ToDo App</a>
				</li>
			</ol>
			{showDVD && (
				<DVDOverlay sound={sound} clickCallback={() => setShowDVD(false)} />
			)}
		</main>
	);
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);
