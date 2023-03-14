import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
	BsFillCircleFill,
	BsCircle,
	BsLightningChargeFill,
} from 'react-icons/bs'

function getBrowserName(userAgent: string) {
	if (userAgent.includes('Firefox')) {
		return 'Firefox'
	} else if (userAgent.includes('SamsungBrowser')) {
		return 'Samsung'
	} else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
		return 'Opera'
	} else if (userAgent.includes('Edge') || userAgent.includes('Edg')) {
		return 'MS Edge'
	} else if (userAgent.includes('Chrome')) {
		return 'Chrome'
	} else if (userAgent.includes('Safari')) {
		return 'Safari'
	} else {
		return 'unknown'
	}
}
const browserName = getBrowserName(navigator.userAgent)

const Bar = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: max(10px, 0.8vh);
	background-color: rgba(0, 0, 0, 0.463);
	padding: 0 max(5px, 0.5vh);
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	font-size: max(8px, 0.7vh);
`
const Signal = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	gap: max(2px, 0.1vh);
`
const BatteryBlock = styled.div`
	width: 20%;
	height: 90%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	align-items: center;
`
const BatteryIcon = styled.div`
	position: relative;
	height: 80%;
	width: 35%;
	display: flex;
	justify-content: start;
	align-items: center;
	border: max(1px, 0.1vh) solid white;
	&:after {
		content: '';
		position: absolute;
		right: -15%;
		top: 33%;
		bottom: 33%;
		width: 12%;
		background-color: white;
	}
`
const BatteryIconContent = styled.div`
	position: absolute;
	top: 15%;
	bottom: 15%;
	left: 8%;
	right: 10%;
`

interface SBarProps {
	network?: 1 | 2 | 3 | 4 | 5
	randomizeNetworkQuality?: boolean
	provider?: string
	isCharging?: boolean
	battery?: number
}
export default function StatusBar({
	network = 5,
	randomizeNetworkQuality = true,
	provider = browserName,
	isCharging = false,
	battery = 100,
}: SBarProps) {
	const [networkQuality, setNetworkQuality] = useState<0 | 1 | 2 | 3 | 4 | 5>(
		network
	)
	if (randomizeNetworkQuality) {
		useEffect(() => {
			function randomizeQuality() {
				setNetworkQuality(
					Math.floor(Math.random() * 4 + 2) as 1 | 2 | 3 | 4 | 5
				)
				setTimeout(
					randomizeQuality,
					(Math.floor(Math.random() * 90) + 10) * 1000
				)
			}
		}, [])
	}

	const networkCircles = [1, 2, 3, 4, 5]

	return (
		<Bar>
			<Signal>
				{networkCircles.map((circle, index) =>
					index < networkQuality ? (
						<BsFillCircleFill key={index} />
					) : (
						<BsCircle key={index} />
					)
				)}
				{provider}
			</Signal>

			<BatteryBlock>
				{' '}
				{isCharging && <BsLightningChargeFill />}
				{battery + '%'}
				<BatteryIcon>
					<BatteryIconContent
						style={{
							right: 100 - battery - 10 + '%',
							backgroundColor: battery === 100 ? 'green' : 'white',
						}}
					/>
				</BatteryIcon>
			</BatteryBlock>
		</Bar>
	)
}
