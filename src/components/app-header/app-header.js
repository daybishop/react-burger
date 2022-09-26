import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';

const HeaderLink = ({ children, title, to }) => {
    return (
        <div className={styles.link_wrapper}>
            {children}
            <NavLink
                exact
                className={styles.link}
                activeClassName={styles.link_active}
                to={to}>
                {title}
            </NavLink>
        </div>
    );
}

HeaderLink.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default function AppHeader() {

    const burgerIconType = useRouteMatch({ path: '/', exact: true }) ? 'primary' : 'secondary'
    const listIconType = useRouteMatch({ path: '/profile/orders', exact: true }) ? 'primary' : 'secondary'
    const profileIconType = useRouteMatch({ path: '/profile', exact: true }) ? 'primary' : 'secondary'

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.links}>
                    <HeaderLink title="Конструктор" to='/'>
                        {<BurgerIcon type={burgerIconType} />}
                    </HeaderLink>
                    <HeaderLink title="Лента заказов" to='/profile/orders' >
                        {<ListIcon type={listIconType} />}
                    </HeaderLink>
                </div>
                <div className={styles.logo}>
                    <NavLink to='/'>
                        <Logo />
                    </NavLink>
                </div>
                <div className={styles.profile}>
                    <HeaderLink title="Личный кабинет" to='/profile' >
                        {<ProfileIcon type={profileIconType} />}
                    </HeaderLink>
                </div>
            </nav>
        </header >
    );
}