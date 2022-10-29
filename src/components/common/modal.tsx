import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useEffect } from "react";
import ModalOverlay from "./modal-overlay";
import { FC } from 'react'


const modalRoot = document.getElementById("modal-root");

interface IModal {
    show: boolean
    header?: string
    handleClose: () => void
}

const Modal: FC<IModal> = ({ show, children, header, handleClose }) => {

    useEffect(() => {
        const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        }
        if (show) {
            document.body.addEventListener('keydown', closeOnEscapeKeyDown)
            return () => {
                document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
            }
        }
    }, [show]) // eslint-disable-line react-hooks/exhaustive-deps

    if (!show) {
        return null
    }

    return createPortal(
        (
            <ModalOverlay handleClose={handleClose}>
                <section data-testid="modal" className={styles.main} onClick={e => e.stopPropagation()}>
                    <div className={`text text_type_main-large pt-10 pb-6 ${styles.title}`}>
                        <span>{header}</span>
                        <CloseIcon type='primary' onClick={handleClose} />
                    </div>
                    {children}
                </section>
            </ModalOverlay >
        ),
        modalRoot!
    );
}

export default Modal