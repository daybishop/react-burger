import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../services/actions/auth';
import { useAppDispatch, useFormValues } from '../utils/hooks';
import { FormEvent } from 'react';

export function RegisterPage() {

    const { values, handleChange } = useFormValues({ name: '', email: '', password: '' })
    const dispatch = useAppDispatch()
    const history = useHistory()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(register(values))
        history.replace({ pathname: '/' });
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Регистрация</h1>
                <Input placeholder='Имя' onChange={handleChange} name='name' value={values.name} />
                <Input type='email' onChange={handleChange} placeholder='E-mail' name='email' value={values.email} />
                <PasswordInput onChange={handleChange} name='password' value={values.password} />
                <Button>Зарегистрироваться</Button>
                <span>Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
            </form>
        </div >
    );
} 