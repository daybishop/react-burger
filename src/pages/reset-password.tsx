import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/auth';
import { useAppDispatch, useAppSelector, useFormValues } from '../utils/hooks';
import { userSelectors } from '../services/selectors/user';
import { FormEvent } from 'react';

export function ResetPasswordPage() {

    const isPasswordReset = useAppSelector(userSelectors.isPasswordReset)
    const { values, handleChange } = useFormValues({ password: '', token: '' })
    const history = useHistory()
    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword(values))
        history.replace('/')
    }

    return (
        isPasswordReset
            ? <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.heading}>Восстановление пароля</h1>
                    <PasswordInput onChange={handleChange} name='password' value={values.password} />
                    <Input onChange={handleChange} placeholder='Введите код из письма' name='token' value={values.token} />
                    <Button>Сохранить</Button>
                    <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
                </form>
            </div>
            : <Redirect to='/' />
    );
} 