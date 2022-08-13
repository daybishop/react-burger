import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modals.module.css';
import { useEffect } from "react";

const ModalOverlay = ({ children, handleClose }) => {
    return (
        <div className={styles.modal_overlay} onClick={handleClose}>
            {children}
        </div>
    )
}

export default function Modal({ children, header, handleClose }) {
    const modalRoot = document.getElementById("modal-root");

    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            handleClose();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }
    }, [])

    return createPortal(
        (
            <ModalOverlay handleClose={handleClose}>
                <section className={styles.modal_main} onClick={e => e.stopPropagation()}>
                    <div className={`text text_type_main-large pt-10 pb-6 ${styles.title}`}>
                        <span>{header}</span>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    {children}
                </section>
            </ModalOverlay >
        ),
        modalRoot
    );
} 