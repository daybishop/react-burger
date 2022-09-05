import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/auth';
import { useFormValues } from '../utils/hooks';

export function RegisterPage() {

    const { values, handleChange } = useFormValues({})
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = e => {
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