import styles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../services/actions/auth';
import { useAppDispatch, useAppSelector, useFormValues } from '../utils/hooks';
import { userSelectors } from '../services/selectors/user';
import { FormEvent } from 'react';


export function ForgotPasswordPage() {

    const isPasswordReset = useAppSelector(userSelectors.isPasswordReset)
    const { values, handleChange } = useFormValues({ email: '' })
    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(values))
    }

    if (isPasswordReset) return <Redirect to='/reset-password' />

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <Input type='email' onChange={handleChange} placeholder='E-mail' name='email' value={values.email} />
                <Button>Восстановить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 