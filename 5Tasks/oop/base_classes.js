import { setStorage, getStorage } from '../localStorage/localstorage.js';
export default class Component {
	constructor(element = 'div', stateStorageName = undefined) {
		this.storageName = stateStorageName;
		const stateStore = getStorage(stateStorageName);
		this.state = stateStore ? stateStore : {};
		this.props = {};
		this.element = document.createElement(element);
	}

	setState(state) {
		this.state = { ...this.state, ...state };
		if (this.storageName) {
			setStorage(this.storageName, this.state);
		}
		this.update();
	}
	loadStorage() {
		if (this.storageName) {
			const stateStore = getStorage(this.storageName);
			this.state = { ...this.state, ...stateStore };
		}
	}
	updateStorage(updatedState) {
		if (this.storageName) {
			setStorage(this.storageName, { ...this.state, ...updatedState });
		}
	}

	/**
	 *
	 * @param props
	 * @returns {HTMLElement}
	 */
	render(props = {}) {
		this.props = { ...props };
		const el = this.element;
		if (props.onLoad) {
			el.onload = props.onLoad;
		}
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
		if (props.onChange) {
			el.onchange = props.onChange;
		}
		if (props.onKeydown) {
			el.onkeydown = props.onKeydown;
		}
		if (props.onSubmit) {
			el.onsubmit = props.onSubmit;
		}

		if (props.style) {
			Object.assign(el.style, props.style);
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
		if (props.htmlFor) {
			el.htmlFor = props.htmlFor;
		}
		if (props.tabindex) {
			el.tabIndex = props.tabindex;
		}

		if (props.focus === true) {
			setTimeout(() => {
				el.focus();
			}, 0);
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
