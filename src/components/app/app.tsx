import { FC, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import style from './app.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getItems } from '../../services/actions/items-actions';
import Profile from '../../pages/profile/profile';
import SignIn from '../../pages/sign-in/sign-in';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import ProtectedRouteLogined from '../protected-route-logined/protected-route-logined';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import { ModalSwitch } from '../modal-switch/modal-switch';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import Constructor from '../../pages/constructor/constructor';
export interface IResponseStatus {
  itemsRequest: boolean;
  itemsRequestFailed: boolean;
}
const App: FC = () => {
  const dispatch = useDispatch();

  const responseStatus: IResponseStatus = useSelector((store: any) => ({
    itemsRequest: store.items.itemsRequest,
    itemsRequestFailed: store.items.itemsRequestFailed,
  }));

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <>
      {!responseStatus.itemsRequest && !responseStatus.itemsRequestFailed ? (
        <>
          <Router>
            <AppHeader />
            <main className={style.main}>
              <ModalSwitch>
                <ProtectedRouteLogined path='/reset-password'>
                  <ResetPassword />
                </ProtectedRouteLogined>
                <ProtectedRouteLogined path='/forgot-password'>
                  <ForgotPassword />
                </ProtectedRouteLogined>
                <ProtectedRouteLogined path='/register'>
                  <Registration />
                </ProtectedRouteLogined>
                <ProtectedRouteLogined path='/login'>
                  <SignIn />
                </ProtectedRouteLogined>
                <ProtectedRoute path='/profile'>
                  <Profile />
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                  <IngredientDetails />
                </Route>
                <Route path='/'>
                  <Constructor />
                </Route>
                <Route>
                  <NotFound404 />
                </Route>
              </ModalSwitch>
            </main>
          </Router>
        </>
      ) : (
        <div>(((</div>
      )}
    </>
  );
};

export default App;
