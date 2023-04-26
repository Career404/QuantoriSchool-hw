interface FuncState {
	[name: string]: any;
}

interface State {
	[x: string | number | symbol]: any;
}
interface Props {
	onClick?: EventListener;
	onLoad?: EventListener;
	onFocus?: EventListener;
	onBlur?: EventListener;
	onInput?: EventListener;
	onChange?: EventListener;
	onKeydown?: EventListener;
	onSubmit?: EventListener;
	style?: Partial<CSSStyleDeclaration>;
	className?: string | string[];
	id?: string;
	minLength?: number;
	name?: string;
	type?: string;
	value?: string;
	placeholder?: string;
	checked?: boolean;
	htmlFor?: string;
	tabindex?: number;
	focus?: boolean;
	children?: string | HTMLElement | Array<HTMLElement | string>;
}

interface Task {
	title: string;
	isCompleted: boolean;
	dateDueJson: string;
	tag: string;
	id: string;
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

interface AppState {
	items: Task[];
	geo: [number, number];
	weatherLastUpdated?: number;
	lastUpdated?: number;
	latestWeather: LatestWeather;
	searchRequest: string;
	searchInputFocus?: boolean;
}

interface IconProps extends Props {
	icon?: string;
	text?: string;
}
interface ListProps extends Props {
	items: Task[];
	clickCheckbox: Function;
	removeItem?: Function;
}
interface ListItemProps extends Props {
	item: Task;
	clickCheckbox: Function;
	removeItem: Function;
}

interface ModalProps extends Props {
	title?: string;
	onCancel?: Function;
	agreeText?: string;
	onAgree?: Function;
	agreeCallbackParam?: any;
	inputElementRef?: HTMLInputElement;
}

interface WeatherWidgetProps extends Props {
	weather: LatestWeather;
}
