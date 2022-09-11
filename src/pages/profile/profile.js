import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../services/selectors/user';
import { useEffect } from 'react';
import { getUser, setUserData } from '../../services/actions/auth';
import { useFormValues } from '../../utils/hooks';
import { useState } from 'react';

export function ProfilePage() {

    const { values, setValues, handleChange } = useFormValues({ name: '', email: '' })
    const [userDataChanged, setUserDataChanged] = useState(false)
    const name = useSelector(userSelectors.name)
    const email = useSelector(userSelectors.email)
    const dispatch = useDispatch()

    const init = (values) => {
        setValues({ ...values, name, email })
        setUserDataChanged(false)
    }
    useEffect(() => {
        dispatch(getUser())
        init({ name, email })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setUserDataChanged(name !== values.name || email !== values.email)
    }, [name, email, values])

    const onSubmit = e => {
        e.preventDefault()
        dispatch(setUserData(values))
    }

    const onCancel = () => {
        init()
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.links}>
                <li>
                    <NavLink
                        to='/profile'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/profile/orders'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>История заказов
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/logout'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>Выход</NavLink>
                </li>
                <span>В этом разделе вы можете изменить свои персональные данные</span>
            </ul>
            <div className={styles.user_data}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input onChange={handleChange} placeholder='Имя' name='name' value={values.name || ''}></Input>
                    <EmailInput onChange={handleChange} name='email' value={values.email || ''}></EmailInput>
                    <PasswordInput readOnly name='password' value=''></PasswordInput>
                    {userDataChanged && <div className={styles.buttons}>
                        <Button onClick={onCancel} type="secondary">Отмена</Button>
                        <Button>Сохранить</Button>
                    </div>}
                </form>
            </div>
        </div >
    );
}
