import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfileInfo from '../../components/profile-info/profile-info';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import ProfileOrders from '../../components/profile-orders/profile-orders';
import NotFound404 from '../not-found-404/not-found-404';
import Styles from './profile.module.css';

const Profile: FC = () => {
  const { url } = useRouteMatch();
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
