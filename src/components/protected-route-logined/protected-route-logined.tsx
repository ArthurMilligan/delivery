import { FC, useEffect,ReactChild } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect, Route, RouteProps } from 'react-router-dom';
import {
  getUserInformation,
  updateToken,
} from '../../services/actions/auth-actions';
import { ILocationState } from '../../utils/types';

const ProtectedRouteLogined: FC<RouteProps&{children:ReactChild}> = ({
  children,
  ...rest
}) => {
  const isAuth: boolean = useSelector((store: any) => store.auth.isAuth);
  const location = useLocation<ILocationState>();
  const getUserStatusFailed: boolean = useSelector(
    (store: any) => store.auth.getUserInfo.getUserRequestFailed
  );
  const dispatch = useDispatch();
  const lastLocation = location && location.state && location.state.from;
  const pathname =
    lastLocation && location.state.from && location.state.from.pathname
      ? location.state.from.pathname
      : '/';
  useEffect(() => {
    dispatch(getUserInformation());
    if (getUserStatusFailed) {
      dispatch(updateToken());
      dispatch(getUserInformation());
    }
  }, []);
  return (
    <Route
      {...rest}
      render={() =>
        !isAuth ? (
          children
        ) : (
          <Redirect to={lastLocation && location.state.from ? pathname : '/'} />
        )
      }
    />
  );
};
export default ProtectedRouteLogined;
