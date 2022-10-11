import styles from './modal-overlay.module.css';
import { FC } from 'react'

interface IModalOverlay {
    handleClose: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ children, handleClose }) => {
    return (
        <div className={styles.overlay} onClick={handleClose}>
            {children}
        </div>
    )
}

export default ModalOverlay;