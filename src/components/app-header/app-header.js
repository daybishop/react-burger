import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';

const NavLink = ({ className, icon, title }) => {
    return (
        <div className={className}>
            <span className={`text text_type_main-default ${styles.button_text}`}>
                {icon}
                {title}
            </span>
        </div>
    );
}

NavLink.propTypes = {
    className: PropTypes.string.isRequired,
    icon: PropTypes.objectOf(BurgerIcon),
    title: PropTypes.string.isRequired,
};

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.links}>
                    <NavLink className={styles.nav_link_active} title="Конструктор" icon={<BurgerIcon type="primary" />} />
                    <NavLink className={styles.nav_link} title="Лента заказов" icon={<ListIcon type="secondary" />} />
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <NavLink className={styles.nav_link_profile} title="Личный кабинет" icon={<ProfileIcon type="secondary" />} />
                </div>
            </nav>
        </header >
    );
}