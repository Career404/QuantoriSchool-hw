import Component from '../base_classes.js';

export default class WeatherWidget extends Component {
	render(props) {
		return new Component().render({
			children: [
				new Component().render({
					className: 'weather-icon',
					style: {
						backgroundImage: `url(${props.weather.current.condition.icon})`,
					},
				}),
				new Component('p').render({
					children: props.weather.current.temp_c + '°',
					className: 'weather-temp',
				}),
				new Component('p').render({
					children: props.weather.location.name,
					className: 'weather-city',
				}),
			],
			className: 'weather-widget',
			...props,
		});
	}
}
