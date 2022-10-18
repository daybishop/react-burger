import styles from './register.module.css';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import { useAppDispatch } from '../utils/hooks';

export function LogoutPage() {

    const history = useHistory()

    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(logoutUser())
        history.replace('/login')
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Выход</h1>
                <Button>Выйти</Button>
            </form>
        </div>
    )

} 