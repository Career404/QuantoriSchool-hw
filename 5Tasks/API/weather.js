export async function getGeo() {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position);
				},
				(error) => reject(error)
			);
		} else {
			reject('Geolocation  unavailable');
		}
	});
}
export async function getWeather([lat, long]) {
	const requestString = lat + ',' + long;
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=97ab6f66f2304c95b9d64653231804&q=${requestString}&aqi=no`
	);
	const weather = await response.json();
	return weather;
}
