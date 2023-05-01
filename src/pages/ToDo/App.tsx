import { useState } from 'react';
import Todo from '../../components/Todo/Todo';

export default function App() {
	const [displayServer, setDisplayServer] = useState(true);

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
						<Todo />
					</div>
				)}
			</div>
		</>
	);
}
