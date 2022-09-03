import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export function ProfilePage() {
    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.links}> */}
            <ul className={styles.links}>
                <li>
                    <Link>Профиль</Link>
                </li>
                <li>
                    <Link>История заказов</Link>
                </li>
                <li>
                    <Link>Выход</Link>
                </li>
                <span>В этом разделе вы можете изменить свои персональные данные</span>
            </ul>
            {/* </div> */}
            <div className={styles.user_data}>
                <form className={styles.form}>
                    <Input placeholder='Имя'></Input>
                    <EmailInput></EmailInput>
                    <PasswordInput></PasswordInput>
                </form>
            </div>
        </div>
    );
}
