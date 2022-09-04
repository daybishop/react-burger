import styles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';

export function ForgotPasswordPage() {

    const [form, setForm] = useState({ email: '' })
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault();
        dispatch(forgotPassword(form))
        history.replace({ pathname: '/reset-password' });
    }

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <Input type='email' onChange={onChange} placeholder='E-mail' name='email' value={form.email} />
                <Button onClick={onSubmit}>Восстановить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 