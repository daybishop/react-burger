import styles from './profile.module.css';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/selectors/user';

export function ProfilePage() {

    const name = useSelector(userSelectors.name)
    const email = useSelector(userSelectors.email)
    const history = useHistory()

    const onChange = e => {
        console.log(name, email)
        history.replace({ pathname: '/' });
    }

    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.links}> */}
            <ul className={styles.links}>
                <li>
                    <NavLink
                        to='/profile'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/profile/orders'
                        exact
                        className={styles.link}
                        activeClassName={styles.activeLink}>История заказов
                    </NavLink>
                </li>
                <li>
                    <Link
                        to='/logout'
                        exact
                        className={styles.link}>Выход</Link>
                </li>
                <span>В этом разделе вы можете изменить свои персональные данные</span>
            </ul>
            {/* </div> */}
            <div className={styles.user_data}>
                <form className={styles.form}>
                    <Input onChange={onChange} placeholder='Имя' name='name' value={name || ''}></Input>
                    <EmailInput onChange={onChange} name='email' value={email || ''}></EmailInput>
                    <PasswordInput onChange={onChange} name='password' value=''></PasswordInput>
                </form>
            </div>
        </div >
    );
}