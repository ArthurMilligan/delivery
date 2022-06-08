import { NavLink, useLocation } from 'react-router-dom';
import Styles from './profile-navigation.module.css';
import { useDispatch } from '../../services/types/hooks';
import { logout } from '../../services/actions/auth-actions';
import { FC } from 'react';
import { IProfileNavigationProps } from '../../utils/types';

const ProfileNavigation: FC<IProfileNavigationProps> = ({ url }) => {
  const dispatch = useDispatch();
  const {pathname} =useLocation()
  const exitOnClick = () => {
    dispatch(logout());
  };
  return (
    <nav className={`${Styles.sideBar} mr-15`}>
      <ul>
        <li>
          <NavLink className='text text_type_main-medium text_color_inactive' activeClassName={Styles.active} exact to={`${url}`}>
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink className='text text_type_main-medium text_color_inactive' activeClassName={Styles.active} to={`${url}/orders`}>
            История заказов
          </NavLink>
        </li>
        <li className={`text text_type_main-medium text_color_inactive ${Styles.exit}`} onClick={exitOnClick}>
          Выход
        </li>
      </ul>
      <div className={`${Styles.description} mt-20`}>
        <p className='text text_type_main-default text_color_inactive'>
          {pathname==='/profile'
          ?'В этом разделе вы можете изменить свои персональные данные'
          :'В этом разделе вы можете просмотреть свою историю заказов'}
          </p>
      </div>
    </nav>
  );
};

export default ProfileNavigation;
