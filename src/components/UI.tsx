import React, { PropsWithChildren, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs'
import { RiBatteryChargeFill, RiBatteryChargeLine } from 'react-icons/ri'

const UIBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: max(35px, 5vh);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	gap: 5%;
	background-color: #808080a1;
`
const UIButton = styled.div`
	height: 75%;
	aspect-ratio: 1/1;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0000007a;
	font-size: calc(0.7 * max(35px, 5vh));
	&:hover {
		scale: 1.1;
		box-shadow: 0 0 1px 2px black;
	}
`

interface UIProps extends PropsWithChildren {
	isLocked: boolean
	setisLockedCallback: Function
	isCharging: boolean
	setIsChargingCallback: Function
}

export default function UI({
	isLocked,
	setisLockedCallback,
	isCharging,
	setIsChargingCallback,
}: UIProps) {
	return (
		<UIBar>
			<UIButton onClick={() => setisLockedCallback(!isLocked)}>
				{isLocked ? <BsFillUnlockFill /> : <BsFillLockFill />}
			</UIButton>
			<UIButton onClick={() => setIsChargingCallback(!isCharging)}>
				{isCharging ? <RiBatteryChargeFill /> : <RiBatteryChargeLine />}
			</UIButton>
		</UIBar>
	)
}
