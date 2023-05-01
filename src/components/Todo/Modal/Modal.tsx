import Component from '../../base_classes';
import { getChildrenArray } from '../../../helpers';

import './Modal.css';

interface ModalProps extends Props {
	title?: string;
	onCancel?: Function;
	agreeText?: string;
	onAgree?: Function;
	agreeCallbackParam?: any;
	inputElementRef?: HTMLInputElement;
}

export default class Modal extends Component {
	render(props: ModalProps) {
		this.element.classList.add('fullscreen');
		this.element.onclick = () => this.element.remove();
		if (props.onCancel) {
			this.element.onclick = props.onCancel as (
				this: GlobalEventHandlers,
				ev: MouseEvent
			) => any;
		}

		let cancelButton: HTMLElement | HTMLButtonElement;
		let agreeButton: HTMLElement | HTMLButtonElement;
		let displayedButtons;

		if (props.title === 'New Task') {
			agreeButton = new Component('button').render({
				type: 'submit',
				children: 'Add Task',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
					this.element.remove();
				},
				className: ['button', 'agree-button'],
			});
			(agreeButton as HTMLButtonElement).disabled = true;

			cancelButton = new Component('button').render({
				children: 'Cancel',
				onClick: () => {
					props.onCancel ? props.onCancel() : this.element.remove();
				},
				className: ['button', 'cancel-button'],
			});

			displayedButtons = [cancelButton, agreeButton];

			if (props.inputElementRef) {
				props.inputElementRef.addEventListener('input', () =>
					props.inputElementRef.value.length < 1
						? ((agreeButton as HTMLButtonElement).disabled = true)
						: ((agreeButton as HTMLButtonElement).disabled = false)
				);
				props.inputElementRef.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						agreeButton.click();
					}
				});
			}
		} else {
			agreeButton = new Component('button').render({
				children: props.agreeText || 'Continue',
				type: 'submit',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
				},
				className: ['button', 'agree-button'],
			});
			displayedButtons = [agreeButton];
		}

		props.children = [
			new Component().render({
				className: 'modal',
				onClick: (e) => e.stopPropagation(),
				children: [
					new Component('h3').render({ children: props.title }),
					...getChildrenArray(props.children),
					new Component().render({
						className: 'buttons-container',
						children: displayedButtons,
					}),
				],
			}),
		];

		return super.render(props);
	}
}
