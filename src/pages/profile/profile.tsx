import { FC, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfileInfo from '../../components/profile-info/profile-info';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import ProfileOrders from '../../components/profile-orders/profile-orders';
import NotFound404 from '../not-found-404/not-found-404';
import Styles from './profile.module.css';
import { getUserInformation, updateToken } from '../../services/actions/auth-actions';
import { useDispatch, useSelector } from '../../services/types/hooks';

const Profile: FC = () => {
  const { url } = useRouteMatch();
  const getUserStatusFailed = useSelector((store) => store.auth.getUserInfo.getUserRequestFailed),
    isAuth = useSelector((store) => store.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInformation());
    if (getUserStatusFailed) {
      dispatch(updateToken());
      dispatch(getUserInformation());
    }
  }, [dispatch, isAuth]);
  return (
    <div className={Styles.Profile}>
      <ProfileNavigation url={url} />
      <div className={Styles.changeProfileBlock}>
        <Switch>
          <Route exact={true} path={`${url}/`}>
            <ProfileInfo />
          </Route>
          <Route path={`${url}/orders`}>
            <ProfileOrders />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Profile;
