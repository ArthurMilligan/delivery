import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ProtectedRoute from '../protected-route/protected-route';
import { ILocationState, IModalSwitchProps } from '../../utils/types';

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
    </>
  );
};
