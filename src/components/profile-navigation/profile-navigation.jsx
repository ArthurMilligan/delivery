import { NavLink } from "react-router-dom"
import Styles from './profile-navigation.module.css'
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/auth-actions";

const ProfileNavigation = ({ url }) => {
    const dispatch = useDispatch();
    const exitOnClick = () => {
        dispatch(logout())
    }
    return (
        <nav className={`${Styles.sideBar} mr-15`}>
            <ul>
                <li>
                    <NavLink
                        className="text text_type_main-medium text_color_inactive"
                        activeClassName={Styles.active}
                        exact
                        to={`${url}`}>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="text text_type_main-medium text_color_inactive"
                        activeClassName={Styles.active}
                        to={`${url}/orders`}>
                        История заказов
                    </NavLink>
                </li>
                <li className={`text text_type_main-medium text_color_inactive ${Styles.exit}`} onClick={exitOnClick}>
                    Выход
                </li>
            </ul>
            <div className={`${Styles.description} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
        </nav>
    )
}

ProfileNavigation.propTypes = {
    url: PropTypes.string.isRequired
}
export default ProfileNavigation