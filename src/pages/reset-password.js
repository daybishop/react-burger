import { useState } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/auth';

export function ResetPasswordPage() {

    const [form, setForm] = useState({ token: '', password: '' })
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(form))
    }

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <PasswordInput onChange={onChange} placeholder='Введите новый пароль' name='password' value={form.password} />
                <Input onChange={onChange} placeholder='Введите код из письма' name='token' value={form.token} />
                <Button onClick={onSubmit}>Сохранить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 