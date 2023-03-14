import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import chargerURL from '../../assets/charger.png'
import USBURL from '../../assets/usb.png'

const FullscreenClutter = styled.div`
	pointer-events: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
`
const freeChargerAnim = keyframes`
  from {
		bottom: -100px
	}
	to {
    bottom: -100vh;
    }
`
const ChargerOff = styled.div`
	pointer-events: initial;
	position: absolute;
	bottom: -100px;
	right: -250px;
	height: max(400px, 4vh);
	width: max(500px, 5vh);
	background: url(${chargerURL}) center no-repeat;
	background-size: contain;
	transition: bottom 1s;
	cursor: pointer;
	animation: ${freeChargerAnim} reverse 1s;
`
const cableAnimation = keyframes`
	from {
		top: 100vh;
	}
	to {
		top: calc(50% + max(250px, 20vh) - max(20px, 1vh));
  }
`

const ChargerOn = styled.div`
	position: absolute;
	bottom: 0;
	top: calc(50% + max(250px, 20vh) - max(20px, 1vh));
	left: 50%;
	transform: translate(-50%);
	width: max(20px, 4vh);
	cursor: pointer;
	pointer-events: initial;
	animation: ${cableAnimation} 1s;
`
const CoCable = styled.div`
	position: absolute;
	top: 10%;
	left: 50%;
	right: 50%;
	transform: translate(-50%);
	width: 25%;
	height: 150%;
	background-color: white;
`
const CoBlock = styled.div`
	position: absolute;
	top: max(20px, 1vh);
	left: 50%;
	transform: translate(-50%);
	width: 80%;
	height: max(50px, 15%);
	border-radius: 5px;
	background: grey url(${USBURL}) center no-repeat;
	background-size: 75%;
`

const CoConnector = styled.div`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%);
	width: 60%;
	height: max(20px, 1vh);
	z-index: -1;
	background: repeating-linear-gradient(
		90deg,
		#d9d9d9 0%,
		#d9d9d9 20%,
		#c3b868 21%,
		#c3b868 69%,
		#d9d9d9 70%,
		#d9d9d9 100%
	);
	background-size: 10%;
`

interface ChargerProps {
	isCharging: boolean
	setIsChargingcallback: Function
}
export default function Charger({
	isCharging,
	setIsChargingcallback,
}: ChargerProps) {
	function plugCharger(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.currentTarget.style.bottom = '-100vh'
		setTimeout(() => {
			setIsChargingcallback(true)
		}, 1000)
	}

	function unplugCharger(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.currentTarget.style.top = '100vh'
		setTimeout(() => {
			setIsChargingcallback(false)
		}, 800)
	}
	return (
		<FullscreenClutter>
			{!isCharging ? (
				<ChargerOff onClick={(e) => plugCharger(e)} />
			) : (
				<ChargerOn onClick={(e) => unplugCharger(e)}>
					<CoCable />
					<CoBlock />
					<CoConnector />
				</ChargerOn>
			)}
		</FullscreenClutter>
	)
}
