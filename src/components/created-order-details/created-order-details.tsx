import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { getItems } from '../../services/actions/items-actions';
import { WS_CONNECTION_START } from '../../services/constans/ws-constans';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { dateOptions, undefinedImg } from '../../utils/constans';
import Styles from './created-order-details.module.css';
import { ImapIngredient } from '../../utils/types';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { wsUrl } from '../../utils/url';
import { getCookie } from '../../utils/cookie';
import { getUserInformation, updateToken } from '../../services/actions/auth-actions';
export interface ICreatedOrderDetailsProps {
  isFeed?: boolean;
}
const CreatedOrderDetails: FC<ICreatedOrderDetailsProps> = ({ isFeed }) => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const { orders, wsConnected } = useSelector((store) => store.wsFeed);
  const allIngredients = useSelector((store) => store.items.items);
  const currentOrder = orders.find((item) => item._id === id);
  const accessToken = '?token=' + getCookie('accessToken')?.slice(7) || 'all';
  const getUserStatusFailed = useSelector((store) => store.auth.getUserInfo.getUserRequestFailed);

  useEffect(() => {
    dispatch(getUserInformation());
    if (getUserStatusFailed) {
      dispatch(updateToken());
      dispatch(getUserInformation());
    }
    if (!allIngredients.length) {
      dispatch(getItems());
    }
    if (!wsConnected) {
      if (isFeed) {
        dispatch({ type: WS_CONNECTION_START, payload: wsUrl + 'all' });
      }
      if (!isFeed && accessToken) {
        dispatch({ type: WS_CONNECTION_START, payload: wsUrl + accessToken });
      }
    }
  }, []);
  if (!currentOrder) {
    return <NotFound404 />;
  }
  const mapIngredients: Array<ImapIngredient> = [];
  currentOrder?.ingredients.forEach((item) => {
    if (!mapIngredients.find((i) => i.id === item)) {
      mapIngredients.push({ id: item, count: 1 });
    } else {
      mapIngredients.forEach((i) => {
        if (i.id === item) i.count++;
      });
    }
  });
  const ingredients = mapIngredients?.map((item) => ({ ...allIngredients.find((ingredient) => ingredient._id === item.id), count: item.count }));
  let totalPrice = 0;
  ingredients.forEach((i) => {
    totalPrice += i.price || 0 * i?.count;
  });

  return allIngredients.length || wsConnected ? (
    <div className={Styles.order}>
      <p className={`${Styles.orderNumber} mb-10 text text_type_digits-default`}>#{currentOrder?.number}</p>
      <p className={`${Styles.burgerName} mb-3 text text_type_main-medium`}>{currentOrder?.name}</p>
      {currentOrder?.status === 'done' ? (
        <p className={`${Styles.status} ${Styles.done} mb-15 text text_type_main-small`}>Выполнен</p>
      ) : (
        <p className={`${Styles.status} mb-15 text text_type_main-small`}>Готовится</p>
      )}
      <p className={`mb-6 text text_type_main-medium`}>Состав:</p>
      <div className={`${Styles.elementsBlock} mb-10`}>
        {ingredients?.map((ingredient) => (
          <div key={uuidv4()} className={`${Styles.element} mb-4 mr-6`}>
            <div className={`${Styles.imgBlock} mr-4`}>
              <img className={`${Styles.img}`} src={ingredient?.image_mobile || undefinedImg} alt='картинка' />
            </div>
            <div className={Styles.elementName}>
              <span className={` mr-4 text text_type_main-small`}>{ingredient?.name}</span>
              <span className={`text text_type_digits-default`}>
                {ingredient?.count} x {ingredient?.price}
              </span>
            </div>

            <CurrencyIcon type='primary' />
          </div>
        ))}
      </div>
      <div className={`${Styles.total}`}>
        <span className='text text_type_main-default text_color_inactive'>
          {new Date(currentOrder?.updatedAt || '').toLocaleDateString('ru-RU', dateOptions)}
        </span>
        <span className='text text_type_digits-default'>
          {totalPrice}
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default CreatedOrderDetails;
