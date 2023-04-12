export default class Component {
	constructor(element = 'div') {
		this.state = {};
		this.props = {};
		this.element = document.createElement(element);
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
		if (props.onClick) {
			el.onclick = props.onClick;
		}
		if (props.onFocus) {
			el.onfocus = props.onFocus;
		}
		if (props.onBlur) {
			el.onblur = props.onBlur;
		}
		if (props.onInput) {
			el.oninput = props.onInput;
		}
		if (props.style) {
			el.style = props.style;
		}
		if (props.className) {
			const classes = Array.isArray(props.className)
				? props.className
				: [props.className];
			classes.forEach((className) => {
				el.classList.add(className);
			});
		}

		if (props.id) {
			el.id = props.id;
		}
		if (props.minLength) {
			el.minlength = props.minLength;
		}
		if (props.name) {
			el.name = props.name;
		}
		if (props.type) {
			el.type = props.type;
		}
		if (props.value) {
			el.value = props.value;
		}
		if (props.placeholder) {
			el.placeholder = props.placeholder;
		}
		if (props.checked) {
			el.checked = props.checked;
		}
		if (props.focus === true) {
			console.log('we focus');
			el.focus({ focusVisible: true });
		}

		el.innerHTML = '';
		const children = props.children
			? Array.isArray(props.children)
				? props.children
				: [props.children]
			: [];
		el.append(...children);
		return el;
	}

	update() {
		this.render(this.props);
	}
}
