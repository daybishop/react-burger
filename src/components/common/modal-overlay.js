import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, handleClose }) => {
    return (
        <div className={styles.overlay} onClick={handleClose}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;