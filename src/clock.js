const timeTarget = document.getElementById('time')
const dateTarget = document.getElementById('date')
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

function displayDate() {
	const date = new Date()

	timeTarget.textContent = date.getHours() + ':' + date.getMinutes()

	dateTarget.textContent =
		weekDayLookup[date.getDay()] +
		', ' +
		date.getDate() +
		' ' +
		monthLookup[date.getMonth()]
}

displayDate()
setInterval(displayDate, 10000)
