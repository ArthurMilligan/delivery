import { Component, FC, useEffect, ReactNode, ReactChild } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  getUserInformation,
  updateToken,
} from '../../services/actions/auth-actions';
import {RouteProps} from 'react-router'

const ProtectedRoute: FC<RouteProps&{children:ReactChild}> = ({ children, ...rest }) => {
  const isAuth: boolean = useSelector((store: any) => store.auth.isAuth);
  const location = useLocation();
  const getUserStatusFailed: boolean = useSelector(
    (store: any) => store.auth.getUserInfo.getUserRequestFailed
  );
  const dispatch = useDispatch();
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
