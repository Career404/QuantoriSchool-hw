import { useState, useEffect } from 'react';
import useLocalStorage from '../../utility/localStorage/localstorage';
import Todo from '../../components/Todo/Todo';

export default function App() {
	const [displayServer, setDisplayServer] = useState(true);
	const [auth, setAuth] = useLocalStorage('instanceId', Date.now().toString());

	useEffect(() => {
		setAuth(auth);
	}, []);
	//authentification is not implemented here, but that's how I intend to do it
	//this is currently tied to browser instance, not server
	return (
		<>
			<input
				className="radioTab"
				id="private"
				name="group"
				type="radio"
				checked={!displayServer}
				onChange={() => setDisplayServer(false)}
			/>
			<input
				className="radioTab"
				id="server"
				name="group"
				type="radio"
				checked={displayServer}
				onChange={() => setDisplayServer(true)}
			/>
			<div className="tab-wrapper">
				<label className="tab" id="private-tab" htmlFor="private" tabIndex={1}>
					Private
				</label>
				<label className="tab" id="server-tab" htmlFor="server" tabIndex={1}>
					Server
				</label>
			</div>
			<div className="panels-wrapper">
				{!displayServer && (
					<div className="panel" id="private-panel">
						<Todo offlineInstance={true} />
					</div>
				)}
				{displayServer && (
					<div className="panel" id="server-panel">
						<Todo userId={auth} />
					</div>
				)}
			</div>
		</>
	);
}
