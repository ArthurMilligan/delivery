import { FC } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useLocation, useRouteMatch } from 'react-router';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import { ILocationState, IModalSwitchProps } from '../../utils/types';
import CreatedOrderDetails from '../created-order-details/created-order-details';
import OrderDetails from '../order-details/order-details';

export const ModalSwitch: FC<IModalSwitchProps> = ({ children }) => {
  const history = useHistory();
  const onClose = () => {
    history.goBack();
  };
  const location = useLocation<ILocationState>();
  const match = useRouteMatch('/profile/:orderNumber');
  const background = location && location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>{children}</Switch>
      {background && match && (
        <ProtectedRoute path='/profile/:orderNumber'>
          <Modal onClose={onClose}>
            <OrderDetails />
          </Modal>
        </ProtectedRoute>
      )}
      {background && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal onClose={onClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <ProtectedRoute
          path='/profile/orders/:id'
          children={
            <Modal onClose={onClose}>
              <CreatedOrderDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          path='/feed/:id'
          children={
            <Modal onClose={onClose}>
              <CreatedOrderDetails />
            </Modal>
          }
        />
      )}
    </>
  );
};
