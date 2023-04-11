export default class Component {
	constructor() {
		this.state = {};
		this.props = {};
		this.element = document.createElement('div');
	}

	setState(state) {
		this.state = { ...this.state, ...state };
		this.update();
	}

	/**
	 *
	 * @param props
	 * @returns {HTMLElement}
	 */
	render(props = {}) {
		this.props = { ...props };
		const el = this.element;
		el.onclick = props.onClick;
		if (props.style) {
			el.style = props.style;
		}
		el.innerHTML = '';
		const children = Array.isArray(props.children)
			? props.children
			: [props.children];
		el.append(...children);
		return el;
	}

	update() {
		this.render(this.props);
	}
}
