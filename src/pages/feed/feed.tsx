import { FC, useEffect } from 'react';
import Order from '../../components/order/order';
import { useDispatch, useSelector } from '../../services/types/hooks';
import Styles from './feed.module.css';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/constans/ws-constans';
import Loading from '../../components/loading/loading';
import { wsUrl } from '../../utils/url';

const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: wsUrl + '/all' });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);
  const { orders, total, totalToday, wsConnected } = useSelector((store) => store.wsFeed);
  return wsConnected ? (
    <div>
      <h1>Лента Заказов</h1>
      <div className={`${Styles.ordersTape}`}>
        <div className={`${Styles.tape} pr-2 mr-15`}>
          {orders.map((item) => {
            return (
              <Order
                key={item._id}
                orderDate={item.updatedAt}
                orderNumber={item.number}
                burgerIngredientsId={item.ingredients}
                burgerName={item.name}
                id={item._id}
                redirect={'feed'}
              />
            );
          })}
        </div>
        <div className={Styles.description}>
          <div className={`${Styles.ordersInfo} mb-15`}>
            <div className={`${Styles.ordersInfoBlock} mr-9`}>
              <span className={`text text_type_main-medium mb-6`}>Готовы:</span>
              <div className={Styles.orders}>
                {orders.map((item, index) => {
                  if (index > 9) return null;
                  return item.status === 'done' ? (
                    <span
                      key={item._id}
                      className={`${Styles.doneOrders} ${
                        index < 5 ? Styles.firstColumn : Styles.secondColumn
                      } text text_type_digits-default mb-2 mr-2`}
                    >
                      {item.number}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <div className={`${Styles.ordersInfoBlock}`}>
              <span className={`text text_type_main-medium mb-6`}>В работе:</span>
              {orders.map((item) => {
                return item.status !== 'done' ? (
                  <p key={item._id} className={`text text_type_digits-default mb-2`}>
                    {item.number}
                  </p>
                ) : null;
              })}
            </div>
          </div>
          <div className='mb-15'>
            <p className='text text_type_main-medium'>Выполнено за все время:</p>
            <p className='text text_type_digits-large'>{total}</p>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className='text text_type_digits-large'>{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default Feed;
