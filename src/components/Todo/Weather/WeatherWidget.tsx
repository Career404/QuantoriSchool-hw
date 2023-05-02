import { useEffect, useState } from 'react';
import { getGeo, getWeather } from '../../../utility/API/Weather';

import './WeatherWidget.css';

export default function WeatherWidget() {
	const [latestWeather, setLatestWeather] = useState({
		current: {
			condition: {
				icon: "data:image/svg+xml,%3Csvg version='1.1' id='L9' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 0 0' xml:space='preserve'%3E%3Cpath fill='%23808080' d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='rotate' dur='1s' from='0 50 50' to='360 50 50' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E",
			},
			temp_c: 0,
		},
		location: {
			name: 'Loading',
		},
	});

	useEffect(() => {
		loadWeather;
	}, []);

	let geo: [number, number] = [41.716667, 44.783333];
	const weatherLastUpdated = 900000;

	async function loadWeather() {
		try {
			const position = await getGeo();
			geo = [position.coords.latitude, position.coords.longitude];
		} catch (err) {
			console.log('Geolocation failed ', err);
		} finally {
			const weather = await getWeather(geo);
			setLatestWeather(weather);
		}
	}

	return (
		<div className="weather-widget" onClick={loadWeather}>
			<div
				className="weather-icon"
				style={{
					backgroundImage: `url("${latestWeather.current.condition.icon}")`,
				}}
			></div>
			<p className="weather-temp">{latestWeather.current.temp_c + '°'}</p>
			<p className="weather-city">{latestWeather.location.name}</p>
		</div>
	);
}
