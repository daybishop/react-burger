import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/actions/auth';
import { useFormValues } from '../utils/hooks';
import { setIsPasswordReset } from '../services/slices/user';
import { FormEvent, useEffect } from 'react'

export function LoginPage() {

    const { values, handleChange } = useFormValues({ email: '', password: '' })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsPasswordReset(false))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch<any>(loginUser(values))
    }

    return (
        < div className={styles.wrapper} >
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Вход</h1>
                <Input type='email' onChange={handleChange} placeholder='E-mail' name='email' value={values.email} />
                <PasswordInput onChange={handleChange} name='password' value={values.password} />
                <Button>Войти</Button>
                <span>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
                <span>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
            </form>
        </div >
    )
} 