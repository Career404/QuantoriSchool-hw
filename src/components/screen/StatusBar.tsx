import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
	BsFillCircleFill,
	BsCircle,
	BsLightningChargeFill,
	BsWifi,
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
	user-select: none;
	position: absolute;
	top: 0;
	width: 100%;
	height: max(15px, 1vh);
	background-color: rgba(0, 0, 0, 0.463);
	padding: 0 max(5px, 0.5vh);
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	font-size: max(9px, 0.7vh);
`
const Signal = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: max(2px, 0.1vh);
`
const BatteryBlock = styled.div`
	width: 22.5%;
	height: 90%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	gap: 5%;
`
const BatteryIcon = styled.div`
	position: relative;
	height: 75%;
	width: 35%;
	display: flex;
	align-items: center;
	padding: 1% 2.5%;
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
	position: relative;
	height: 75%;
`

interface SBarProps {
	network?: 1 | 2 | 3 | 4 | 5
	randomizeNetworkQuality?: boolean
	provider?: string
	isCharging?: boolean
	battery?: number
	wifi?: boolean
}
export default function StatusBar({
	network = 5,
	randomizeNetworkQuality = true,
	provider = browserName,
	isCharging = false,
	battery = 100,
	wifi = false,
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
				{wifi && <BsWifi />}
			</Signal>

			<BatteryBlock>
				{' '}
				{isCharging && <BsLightningChargeFill />}
				{battery + '%'}
				<BatteryIcon>
					<BatteryIconContent
						style={{
							width: battery + '%',
							backgroundColor: isCharging
								? battery === 100
									? 'green'
									: 'yellow'
								: battery <= 20
								? 'red'
								: 'white',
						}}
					/>
				</BatteryIcon>
			</BatteryBlock>
		</Bar>
	)
}
