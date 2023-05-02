import { useEffect, useState } from 'react';
import { getGeo, getWeather } from '../../../utility/API/Weather';
import useLocalStorage from '../../../utility/localStorage/localstorage';

import './WeatherWidget.css';

export default function WeatherWidget() {
	const [latestWeather, setLatestWeather] = useLocalStorage('weather', {
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
	const [weatherAccessData, setWeatherAccessData] = useLocalStorage(
		'weatherAccessData',
		{
			lastUpdated: 900000,
			geo: [41.716667, 44.783333],
			geoAccess: false,
		}
	);

	useEffect(() => {
		if (Date.now() - weatherAccessData.lastUpdated >= 600000) {
			loadWeather();
		}
	}, []);

	async function loadWeather() {
		let weatherAccessDataAccumulator = weatherAccessData;
		try {
			const position = await getGeo();
			weatherAccessDataAccumulator = {
				...weatherAccessDataAccumulator,
				geo: [position.coords.latitude, position.coords.longitude],
				geoAccess: true,
			};
		} catch (err) {
			console.log('Geolocation failed ', err);
			weatherAccessDataAccumulator.geoAccess = false;
		} finally {
			console.log('loadweather runs');
			const weather = await getWeather(
				weatherAccessDataAccumulator.geo as [number, number]
			);
			setLatestWeather(weather);
			weatherAccessDataAccumulator.lastUpdated = Date.now();
			setWeatherAccessData(weatherAccessDataAccumulator);
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
