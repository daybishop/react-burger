import { useEffect, useState } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from '../services/actions/auth';
import { userSelectors } from '../services/selectors/user';

export function LoginPage() {

    const [form, setForm] = useState({ email: '', password: '' })
    const dispatch = useDispatch()
    const history = useHistory()
    const userIsActive = useSelector(userSelectors.isActive)

    useEffect(() => {
        dispatch(getUser())
        if (userIsActive) {
            history.replace({ pathname: '/' })
        }
    }, [])

    const onSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(form))
        history.replace({ pathname: history.location.state?.from || '/' })
    }

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Вход</h1>
                <Input type='email' onChange={onChange} placeholder='E-mail' name='email' value={form.email} />
                <PasswordInput onChange={onChange} name='password' value={form.password} />
                <Button onClick={onSubmit}>Войти</Button>
                <span>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
                <span>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
            </form>
        </div>
    );
} 