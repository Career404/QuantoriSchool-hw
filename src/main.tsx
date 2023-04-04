import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import DVDOverlay from './components/2DVD/DVDOverlay';

function Main() {
	const [showDVD, setShowDVD] = useState(false);
	return (
		<main>
			<h1>Quantori-homework</h1>
			<h2>Dmitry Zhukov</h2>
			<ol>
				<li>
					<a href="src\pages\1phone\1phone.html">Smartphone</a>
				</li>
				<li>
					<a href="#" onClick={() => setShowDVD(!showDVD)}>
						DVD Screensaver
					</a>
				</li>
			</ol>
			{showDVD && <DVDOverlay />}
		</main>
	);
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);
