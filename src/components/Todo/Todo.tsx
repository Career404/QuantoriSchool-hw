import { useState } from 'react';

import ListItem from './List/List';

export default function Todo({
	offlineInstance = false,
}: {
	offlineInstance?: boolean;
}) {
	const [items, setItems] = useState([
		{
			title: 'If weather is not displayed correctly, click it to load new data',
			isCompleted: false,
			dateDueJson: '2023-04-13T16:11:22.697Z',
			tag: 'home',
			id: '16813158826971',
		},
		{
			title:
				'Try to connect with the server by clicking on the round status icon in the top-right of the screen',
			isCompleted: false,
			dateDueJson: '2023-04-12T16:11:22.697Z',
			tag: 'work',
			id: '16813158826972',
		},
		{
			title:
				'These tasks are saved in localStorage, but will update from server when server will come online',
			isCompleted: false,
			dateDueJson: '2023-04-11T16:11:22.697Z',
			tag: 'health',
			id: '16813158826973',
		},
	]);
	const [searchRequest, setSearchRequest] = useState('');

	const filteredItems = items.filter((item) =>
		item.title.toLowerCase().includes(searchRequest.toLowerCase())
	);
	const notcompletedItems = filteredItems.filter(
		(item) => item.isCompleted !== true
	);
	const completedItems = filteredItems.filter(
		(item) => item.isCompleted === true
	);

	return (
		<div className="main">
			<div className="title">
				<h1>To Do List</h1>
				<h2 className="weather-widget">WeatherWidgetHere</h2>
			</div>
			<div className="search-bar">
				<input
					type="text"
					name="search"
					id="search"
					placeholder="Search Task"
					value={searchRequest}
					onChange={(e) => setSearchRequest(e.target.value)}
				/>
				<button className="button" onClick={() => console.log('clicked Add')}>
					+ New Task
				</button>
			</div>
			<h2>All Tasks</h2>
			<ul>
				{notcompletedItems.map((item) => (
					<ListItem
						item={item}
						clickCheckbox={() => console.log(item.id)}
						removeItem={() => console.log(item.dateDueJson)}
					/>
				))}
			</ul>
			<h2>Completed Tasks</h2>
			<ul>
				{completedItems.map((item) => (
					<ListItem
						item={item}
						clickCheckbox={() => console.log(item.id)}
						removeItem={() => console.log(item.dateDueJson)}
					/>
				))}
			</ul>
		</div>
	);
}
