interface State {
	[x: string | number | symbol]: any;
}
interface Props {
	onClick?: EventListener;
	onLoad?: Function;
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
