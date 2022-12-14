import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';
import { FormEvent, useEffect } from 'react';
import { getUser, setUserData } from '../../services/actions/auth';
import { useAppDispatch, useAppSelector, useFormValues } from '../../utils/hooks';
import { useState } from 'react';
import { IForm } from '../../utils/types';
import { Orders } from '../../components/orders/orders';
import { ordersSelectors } from '../../services/selectors/orders';
import { connectionClose, connectionStart } from '../../services/slices/orders';

export function ProfilePage() {

    const isProfile = useRouteMatch({ path: '/profile', exact: true })
    const isOrders = useRouteMatch({ path: '/profile/orders', exact: true })
    const orders = useAppSelector(ordersSelectors.orders)

    const { values, setValues, handleChange } = useFormValues({ name: '', email: '' })
    const [userDataChanged, setUserDataChanged] = useState<boolean>(false)
    const name = useAppSelector(userSelectors.name)
    const email = useAppSelector(userSelectors.email)
    const dispatch = useAppDispatch()

    const init = (values: IForm) => {
        setValues({ ...values, name, email })
        setUserDataChanged(false)
    }
    useEffect(() => {
        dispatch(getUser())
        init({ name, email })
        dispatch(connectionStart(''))
        return () => {
            dispatch(connectionClose(''))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setUserDataChanged(name !== values.name || email !== values.email)
    }, [name, email, values])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setUserData(values))
    }

    const onCancel = () => {
        init({})
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.links}>
                <li>
                    <NavLink
                        to='/profile'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>??????????????
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/profile/orders'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>?????????????? ??????????????
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/logout'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>??????????</NavLink>
                </li>
                <span>?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????</span>
            </ul>
            {
                isProfile && <div className={styles.user_data}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <Input onChange={handleChange} placeholder='??????' name='name' value={values.name || ''}></Input>
                        <EmailInput onChange={handleChange} name='email' value={values.email || ''}></EmailInput>
                        <PasswordInput onChange={e => { }} name='password' value=''></PasswordInput>
                        {userDataChanged && <div className={styles.buttons}>
                            <Button onClick={onCancel} type="secondary">????????????</Button>
                            <Button>??????????????????</Button>
                        </div>}
                    </form>
                </div>
            }
            {
                isOrders && <Orders orders={orders} />
            }
        </div >
    );
}
