const screen = document.getElementById('screen')
const batteryIndicator = document.getElementById('batteryStatus')
const batteryPercent = document.getElementById('batteryPercent')

let batteryStatus = 99

function setBattery(percent) {
	batteryPercent.innerText = percent
	batteryIndicator.style.width = (percent * 90) / 100 + '%'
}
function batteryDead() {
	screen.querySelectorAll('*').forEach((screenElement) => {
		screenElement.style.display = 'none'
	})
	screen.style.background = 'black'
}

setBattery(batteryStatus)
setInterval(() => {
	batteryStatus -= 1
	if (batteryStatus === 0) batteryDead()
	else setBattery(batteryStatus)
}, 15000)
