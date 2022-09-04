import { useState } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/auth';

export function RegisterPage() {

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault();
        dispatch(register(form))
        history.replace({ pathname: '/' });
    }

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Регистрация</h1>
                <Input placeholder='Имя' onChange={onChange} name='name' value={form.name} />
                <Input type='email' onChange={onChange} placeholder='E-mail' name='email' value={form.email} />
                <PasswordInput onChange={onChange} name='password' value={form.password} />
                <Button onClick={onSubmit}>Зарегистрироваться</Button>
                <span>Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
            </form>
        </div >
    );
} 