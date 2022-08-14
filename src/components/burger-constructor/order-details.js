import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderDetails({ id }) {
    return (
        <div className={styles.content}>
            <span className="text text_type_digits-large">
                {id}
            </span>
            <p className={`text text_type_main-medium ${styles.id_text}`}>
                идентификатор заказа
            </p>
            <div className={styles.order_icon}>
                <CheckMarkIcon />
            </div>
            <p className={`text text_type_main-default ${styles.order_status}`}>
                Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-default ${styles.wait_info}`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

OrderDetails.propTypes = {
    id: PropTypes.string.isRequired,
};