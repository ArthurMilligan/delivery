import { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { updateToken } from '../../services/actions/auth-actions';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/constans/ws-constans';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { getCookie } from '../../utils/cookie';
import Loading from '../loading/loading';
import Order from '../order/order';
import Styles from './profile-orders.module.css'

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken')?.slice(7);
  const redirectToProfileOrders = 'profile/orders';
  useEffect(() => {
    dispatch(updateToken);
    dispatch({ type: WS_CONNECTION_START, payload: accessToken });
    return ()=>{dispatch({ type: WS_CONNECTION_CLOSE})}
  }, [accessToken]);
  const { orders, wsConnected } = useSelector((store) => store.wsFeed);
  return (
    wsConnected?
    (<div className={Styles.ordersTape}>
      {orders.map((item) => {
        return (
          <Order
            key={uuidv4()}
            orderDate={item.updatedAt}
            orderNumber={item.number}
            burgerIngredientsId={item.ingredients}
            burgerName={item.name}
            id={item._id}
            status={item.status}
            redirect={redirectToProfileOrders}
          />
        );
      })}
    </div>)
    :(<Loading/>)
  );
};
export default ProfileOrders;
