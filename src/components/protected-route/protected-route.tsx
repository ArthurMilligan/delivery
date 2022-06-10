import { FC, useEffect, ReactChild } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUserInformation, updateToken } from '../../services/actions/auth-actions';
import { RouteProps } from 'react-router';

const ProtectedRoute: FC<RouteProps & { children: ReactChild }> = ({ children, ...rest }) => {
  const isAuth = useSelector((store) => store.auth.isAuth);
  const location = useLocation();
  // const getUserStatusFailed = useSelector((store) => store.auth.getUserInfo.getUserRequestFailed);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserInformation());
  //   if (getUserStatusFailed) {
  //     dispatch(updateToken());
  //     dispatch(getUserInformation());
  //   }
  // }, [isAuth]);
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
