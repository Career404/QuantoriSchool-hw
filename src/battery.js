const chargerOff = document.getElementById('charger')
const chargerOn = document.getElementById('chargerOn')
const screen = document.getElementById('screen')
const batteryIndicator = document.getElementById('batteryStatus')
const batteryPercent = document.getElementById('batteryPercent')

let batteryConnected = false
let batteryStatus = 99

function setBattery(percent) {
	batteryPercent.innerText = percent
	batteryIndicator.style.width = (percent * 90) / 100 + '%'
}
function batteryDead(isDead) {
	if (isDead) {
		screen.querySelectorAll('*').forEach((screenElement) => {
			screenElement.style.visibility = 'hidden'
		})
		screen.style.backgroundColor = 'black'
		screen.style.backgroundImage = 'none'
	} else {
		screen.querySelectorAll('*').forEach((screenElement) => {
			screenElement.style.visibility = 'visible'
		})
		screen.style.backgroundColor = 'rgb(178, 151, 0)'
		screen.style.backgroundImage = 'url(./src//assets/diagmonds.png)'
	}
}

function connectCharger() {
	chargerOff.style.bottom = '-100vh'
	setTimeout(() => {
		chargerOff.style.display = 'none'
	}, 1000)
	chargerOn.style.display = 'block'
	chargerOn.style.animation = 'cableConnect 1s'
	setTimeout(() => {
		chargerOn.style.animation = 'initial'
		batteryConnected = true
		batteryStatus += 1
		batteryDead(false)
	}, 1000)
}
function disconnectCharger() {
	batteryConnected = false
	chargerOn.style.animation = 'cableConnect 1s reverse'
	setTimeout(() => {
		chargerOn.style.display = 'none'
		chargerOn.style.animation = 'initial'
	}, 1000)
	chargerOff.style.display = 'block'
	setTimeout(() => {
		chargerOff.style.bottom = '-100px'
	}, 1000)
}
chargerOff.addEventListener('click', connectCharger)
chargerOn.addEventListener('click', disconnectCharger)

setBattery(batteryStatus)

let batteryInterval = setInterval(() => {
	if (batteryConnected) {
		batteryStatus >= 99 ? (batteryStatus = 100) : (batteryStatus += 2)
	} else if (batteryStatus === 0) {
		batteryDead(true)
		return
	} else batteryStatus -= 1
	setBattery(batteryStatus)
}, 15000)
