const focusDiv = document.getElementById('focus')
document.addEventListener('mousemove', (e) => {
	focusDiv.style.top = e.clientY + 'px'
	focusDiv.style.left = e.clientX + 'px'
})
