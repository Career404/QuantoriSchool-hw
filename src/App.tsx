import React, { useEffect, useState } from 'react'

import LightGlare from './components/LightGlare'
import Charger from './components/clutter/charger'
import Screen from './components/screen/Screen'
import LockedScreen from './components/screen/Locked'
import StatusBar from './components/screen/StatusBar'

import './style.css'
import LockScreenClock from './components/screen/LockScreenClock'
import MainMenu from './components/screen/MainMenu'
import UI from './components/UI'
import AppIcon from './components/screen/AppIcon'

export default function App() {
	const [fullscreen, setFullscreen] = useState(false)

	useEffect(() => {}, [fullscreen])

	const [isCharging, setIsCharging] = useState(false)
	const [batteryPercent, setBatteryPercent] = useState(100)
	const [isWiFiConnected, setIsWiFiConnected] = useState(false)

	const isOn = batteryPercent > 0 ? true : false

	useEffect(() => {
		let intervalId: number | undefined
		if (isCharging) {
			if (batteryPercent >= 100) {
				null
			} else
				intervalId = setInterval(
					() => setBatteryPercent(batteryPercent + 1),
					10000
				)
		} else if (isOn)
			intervalId = setInterval(
				() => setBatteryPercent(batteryPercent - 1),
				15000
			)
		return () => clearInterval(intervalId)
	}, [isCharging, isOn, batteryPercent])

	const [isLocked, setIsLocked] = useState(true)
	let hideStatus = false

	useEffect(() => {
		console.log('charging? ' + isCharging)
	}, [isCharging])
	const pinnedAppsArr = [
		<AppIcon key={1} />,
		<AppIcon key={2} />,
		<AppIcon key={3} />,
		<AppIcon key={4} />,
	]
	return (
		<>
			{!fullscreen && (
				<Charger
					isCharging={isCharging}
					setIsChargingcallback={setIsCharging}
				/>
			)}
			<div id="phone" style={{ height: fullscreen ? '100vh' : '40vh' }}>
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
				<Screen isOn={isOn}>
					<>
						{!hideStatus && (
							<StatusBar
								isCharging={isCharging}
								battery={batteryPercent}
								wifi={isWiFiConnected}
							/>
						)}
						{isLocked ? (
							<LockedScreen
								isLocked={isLocked}
								setIsLockedCallback={setIsLocked}
							>
								<>
									<LockScreenClock />
								</>
							</LockedScreen>
						) : (
							<MainMenu pinned={pinnedAppsArr}>
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
								<AppIcon />
							</MainMenu>
						)}
					</>
				</Screen>
				<div id="centerButton">
					<div id="centerButton_square"></div>
				</div>
				<div id="glass"></div>
			</div>
			{!fullscreen && <LightGlare />}
			<UI
				fullscreen={fullscreen}
				setFullscreenCallback={setFullscreen}
				isLocked={isLocked}
				setisLockedCallback={setIsLocked}
				isCharging={isCharging}
				setIsChargingCallback={setIsCharging}
				isWiFiConnected={isWiFiConnected}
				setIsWiFiConnectedCallback={setIsWiFiConnected}
			/>
		</>
	)
}
