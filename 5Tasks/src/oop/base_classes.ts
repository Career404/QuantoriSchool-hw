import { setStorage, getStorage } from '../localStorage/localstorage';

export default class Component {
	storageName?: string | undefined;
	state: State = {};
	props: Props = {};
	element?: HTMLElement;

	constructor(
		element: string = 'div',
		stateStorageName: string | undefined = undefined
	) {
		this.storageName = stateStorageName;
		const stateStore = getStorage(stateStorageName);
		this.state = stateStore ?? {};
		this.element = document.createElement(element);
	}

	setState(state: State) {
		this.state = { ...this.state, ...state };
		if (this.storageName) {
			setStorage(this.storageName, this.state);
		}
		this.render(this.state);
	}
	updateStorage() {
		//console.log('update LS', this);
		if (this.storageName) {
			setStorage(this.storageName, this.state);
		}
	}

	addChild(child: string | HTMLElement) {
		if (Array.isArray(this.props.children)) {
			this.props.children.push(child);
		} else {
			this.props.children = [child];
		}
	}

	removeChild(child: string | HTMLElement) {
		if (Array.isArray(this.props.children)) {
			this.props.children = this.props.children.filter(
				(node) => node !== child
			);
		} else if (this.props.children === child) {
			this.props.children = undefined;
		}
	}

	render(props?: Props) {
		props = props ?? this.props;
		this.props = { ...props };
		const el = this.element;
		if (props.onClick) {
			el.onclick = props.onClick;
		}
		if (props.onLoad) {
			setTimeout(props.onLoad, 0);
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
			classes.forEach((className: string) => {
				el.classList.add(className);
			});
		}
		if (props.id) {
			el.id = props.id;
		}
		if (el instanceof HTMLInputElement) {
			if (props.minLength) {
				el.minLength = props.minLength;
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
		}
		if (el instanceof HTMLLabelElement) {
			if (props.htmlFor) {
				el.htmlFor = props.htmlFor;
			}
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
}
