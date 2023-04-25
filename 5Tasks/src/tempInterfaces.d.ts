interface State {
	[x: string | number | symbol]: any;
}

interface task {
	title: string;
	isCompleted: boolean;
	dateDueJson: string;
	tag: string;
	id: string;
}
interface latestWeather {
	current: {
		condition: {
			icon: string;
			[x: string | number | symbol]: any;
		};
		temp_c: number;
		[x: string | number | symbol]: any;
	};
	location: {
		name: string;
		[x: string | number | symbol]: any;
	};
	[x: string | number | symbol]: any;
}

interface appState {
	items: task[];
	geo: [number, number];
	weatherLastUpdated: number;
	lastUpdated: number;
	latestWeather: latestWeather;
	searchRequest: string;
	searchInputFocus: boolean;
}

interface anyObj {
	[x: string | number | symbol]: any;
}
