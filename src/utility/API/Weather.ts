export async function getGeo(): Promise<GeolocationPosition> {
	if (!navigator.geolocation) {
		throw new Error('Geolocation unavailable');
	}
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}
export async function getWeather([lat, long]: [number, number]) {
	const requestString = lat + ',' + long;
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=97ab6f66f2304c95b9d64653231804&q=${requestString}&aqi=no`
	);
	const weather = await response.json();
	return weather;
}
