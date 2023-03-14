import React, { PropsWithChildren, useState, useEffect } from 'react'
import styled from 'styled-components'

const ClockWindow = styled.div`
	user-select: none;
	height: 30%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`
const TimeDiv = styled.div`
	font-size: max(50px, 5vh);
	font-weight: 200;
`
const DateDiv = styled.div`
	font-size: max(14px, 1.4vh);
`

interface LockScreenProps extends PropsWithChildren {
	dateObj?: Date
}
export default function LockScreenClock({ dateObj }: LockScreenProps) {
	const weekDayLookup = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	const monthLookup = [
		'January',
		'Febrauary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const [time, setTime] = useState('')
	const [date, setDate] = useState('')

	useEffect(() => {
		function displayDate() {
			const dateObj = new Date()

			setTime(
				dateObj.getHours() +
					':' +
					dateObj.getMinutes().toString().padStart(2, '0')
			)

			setDate(
				weekDayLookup[dateObj.getDay()] +
					', ' +
					dateObj.getDate() +
					' ' +
					monthLookup[dateObj.getMonth()]
			)
		}

		displayDate()
		const intervalId = setInterval(displayDate, 10000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<ClockWindow>
			<TimeDiv>{time}</TimeDiv>
			<DateDiv>{date}</DateDiv>
		</ClockWindow>
	)
}
