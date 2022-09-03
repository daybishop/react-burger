import React from 'react';
import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <EmailInput></EmailInput>
                <Button>Восстановить</Button>
                <span>Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 