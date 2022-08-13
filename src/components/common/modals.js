import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modals.module.css';

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({ children, handleClose }) => {
    return (
        <div className={styles.modal_overlay} onClick={handleClose} onKeyDown={handleClose}>
            {children}
        </div>
    )
}

export default function Modal({ children, header, handleClose }) {
    return createPortal((
        <ModalOverlay handleClose={handleClose}>
            <section className={styles.modal_main}>
                <div className={`text text_type_main-large pt-10 pb-6 ${styles.title}`}>
                    <span>{header}</span>
                    <CloseIcon onClick={handleClose} />
                </div>
                {children}
            </section>
        </ModalOverlay>
    ), modalRoot
    );
} 