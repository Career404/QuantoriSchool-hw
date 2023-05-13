interface Task {
	title: string;
	isCompleted: boolean;
	dateDueJson: string;
	tag: string;
	id: string;
	//? remove optional flags
	dateCreated?: string;
	lastUpdated?: string;
}
interface LatestWeather {
	current: {
		condition: {
			icon: string;
		};
		temp_c: number;
	};
	location: {
		name: string;
	};
}
