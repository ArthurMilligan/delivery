import { FC, useEffect, ReactChild } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useLocation, Redirect, Route, RouteProps } from 'react-router-dom';
import { getUserInformation, updateToken } from '../../services/actions/auth-actions';
import { ILocationState } from '../../utils/types';

const ProtectedRouteLogined: FC<RouteProps & { children: ReactChild }> = ({ children, ...rest }) => {
  const isAuth = useSelector((store) => store.auth.isAuth);
  const location = useLocation<ILocationState>();
  const getUserStatusFailed = useSelector((store) => store.auth.getUserInfo.getUserRequestFailed);
  const dispatch = useDispatch();
  const lastLocation = location && location.state && location.state.from;
  const pathname = lastLocation && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/';
  useEffect(() => {
    dispatch(getUserInformation());
    if (getUserStatusFailed) {
      dispatch(updateToken());
      dispatch(getUserInformation());
    }
  }, []);
  return <Route {...rest} render={() => (!isAuth ? children : <Redirect to={lastLocation && location.state.from ? pathname : '/'} />)} />;
};
export default ProtectedRouteLogined;
