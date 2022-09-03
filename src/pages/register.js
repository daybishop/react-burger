import React from 'react';
import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export function RegisterPage() {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Регистрация</h1>
                <Input placeholder='Имя'></Input>
                <EmailInput></EmailInput>
                <PasswordInput></PasswordInput>
                <Button>Зарегистрироваться</Button>
                <span>Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
            </form>
        </div>
    );
} 