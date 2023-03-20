import React from 'react'
import ReactDOM from 'react-dom/client'
import LightGlare from '../../components/LightGlare'
import Charger from '../../components/clutter/charger'

import './1style.css'
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Charger />
		<div id="phone">
			<div id="sideButtons">
				<div className="sideElement" id="volSwitch"></div>
				<div className="sideElement sideButton" id="volUp"></div>
				<div className="sideElement sideButton" id="volDown"></div>
				<div className="sideElement sideButton" id="lock"></div>
			</div>
			<div id="elements">
				<div id="mic"></div>
				<div id="offsetLine">
					<div id="camera"></div>
					<div id="speaker"></div>
				</div>
			</div>
			<div id="screen"></div>
			<div id="centerButton">
				<div id="centerButton_square"></div>
			</div>
			<div id="glass"></div>
		</div>
		<LightGlare />
	</React.StrictMode>
)
