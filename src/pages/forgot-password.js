import styles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';
import { useFormValues } from '../utils/hooks';

export function ForgotPasswordPage() {

    const { values, handleChange } = useFormValues({})
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault();
        dispatch(forgotPassword(values))
        history.replace({ pathname: '/reset-password' });
    }

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