import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <PasswordInput></PasswordInput>
                <Input placeholder='Введите код из письма'></Input>
                <Button>Сохранить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 