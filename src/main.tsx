import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

function Main() {
	return (
		<main>
			<h1>Quantori-homework</h1>
			<h2>Dmitry Zhukov</h2>
			<ol>
				<li>
					<a href="src\pages\1phone\1phone.html">Smartphone</a>
				</li>
			</ol>
		</main>
	)
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
)
