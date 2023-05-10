import { PropsWithChildren } from 'react';

import './Modal.css';

interface ModalProps extends PropsWithChildren {
	onClose: () => void;
}

export default function Modal({ onClose, children }: ModalProps) {
	return (
		<div
			className="fullscreen"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			onKeyDown={(e) => {
				if (e.key === 'Escape') {
					onClose();
				}
			}}
		>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}
