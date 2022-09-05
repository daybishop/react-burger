import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/auth';
import { useFormValues } from '../utils/hooks';

export function ResetPasswordPage() {

    const { values, handleChange } = useFormValues({})
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(values))
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <PasswordInput onChange={handleChange} placeholder='Введите новый пароль' name='password' value={values.password} />
                <Input onChange={handleChange} placeholder='Введите код из письма' name='token' value={values.token} />
                <Button>Сохранить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 