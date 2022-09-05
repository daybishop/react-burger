import { useEffect } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from '../services/actions/auth';
import { userSelectors } from '../services/selectors/user';
import { useFormValues } from '../utils/hooks';

export function LoginPage() {

    const { values, handleChange } = useFormValues({})
    const dispatch = useDispatch()
    const history = useHistory()
    const userIsActive = useSelector(userSelectors.isActive)

    useEffect(() => {
        dispatch(getUser())
        if (userIsActive) {
            history.replace({ pathname: '/' })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(values))
        history.replace({ pathname: history.location.state?.from || '/' })
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Вход</h1>
                <Input type='email' onChange={handleChange} placeholder='E-mail' name='email' value={values.email} />
                <PasswordInput onChange={handleChange} name='password' value={values.password} />
                <Button>Войти</Button>
                <span>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
                <span>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
            </form>
        </div>
    );
} 