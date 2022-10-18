import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { userSelectors } from '../../services/selectors/user';
import { useEffect } from 'react'
import { getOrderNumber } from '../../services/actions/orders';
import Modal from '../common/modal';
import { clearOrderData, hideOrder } from '../../services/slices/constructor';
import { constructorSelectors } from '../../services/selectors/constructor';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export default function OrderDetails() {

    const isLoggedOn = useAppSelector(userSelectors.isLoggedOn)
    const bun = useAppSelector(constructorSelectors.bun)
    const burgerIngredients = useAppSelector(constructorSelectors.items)
    const orderNumber = useAppSelector(constructorSelectors.orderNumber)
    const showOrderModal = useAppSelector(constructorSelectors.showOrderModal)
    const isOrderRequested = useAppSelector(constructorSelectors.isOrderRequested)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedOn) {
            const order_ids: Array<string> = bun
                ? [bun._id, ...burgerIngredients.map((item) => item._id), bun._id]
                : []
            if (order_ids.length > 2) {
                dispatch(getOrderNumber(order_ids))
            }
        }
    }, [isLoggedOn, showOrderModal])

    const handleClose = () => {
        dispatch(hideOrder(''))
        dispatch(clearOrderData(''))
    }

    return (
        showOrderModal
            ?
            <Modal show={true} handleClose={handleClose}>
                <div className={styles.content}>
                    <span className="text text_type_digits-large">
                        {orderNumber || '---'}
                    </span>
                    <p className={`text text_type_main-medium ${styles.id_text}`}>
                        идентификатор заказа
                    </p>
                    {isOrderRequested
                        ? <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
                        : <div className={styles.order_icon}>
                            <CheckMarkIcon type='primary' />
                        </div>
                    }
                    <p className={`text text_type_main-default ${styles.order_status}`}>
                        Ваш заказ начали готовить
                    </p>
                    <p className={`text text_type_main-default ${styles.wait_info}`}>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </div>
            </Modal>
            : null
    )
}
