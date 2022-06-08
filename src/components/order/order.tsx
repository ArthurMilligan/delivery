import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getItems } from '../../services/actions/items-actions';
import { dateOptions, undefinedImg } from '../../utils/constans';
import Styles from './order.module.css';
import { v4 as uuidv4 } from 'uuid';
import { IOrderProps } from '../../utils/types';



const Order: FC<IOrderProps> = ({ orderNumber, orderDate, burgerName, burgerIngredientsId, id, redirect, status }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const allIngredients = useSelector((store) => store.items.items);
  let orderCost = 0, 
    rusStatus:string|null = null,
    statusColor:'green'|'grey' = 'grey'
  const burgerIngredients = burgerIngredientsId.map((id) => {
    const currentIngredient = allIngredients.find((ingredient) => ingredient?._id === id) || null;
    orderCost += currentIngredient?.price || 0;
    return { id, img: currentIngredient?.image_mobile || null };
  });

  useEffect(() => {
    if (!allIngredients.length) {
      dispatch(getItems());
    }
  }, []);
  if(status){
    switch(status){
      case 'done':
        rusStatus = 'Выполнен'
        statusColor='green'
        break
      case 'pending':
        rusStatus = 'Готовится'
        break
      case 'created':
        rusStatus = 'Создан'
        break
      default:
        rusStatus = 'Создан'
    }
  }
  return allIngredients.length ? (
    <NavLink
      className={`${Styles.link}`}
      to={{
        pathname: `/${redirect}/${id}`,
        state: { background: location },
      }}
    >
      <div className={`${Styles.feedElement} p-6 mb-3 mr-2`}>
        <div className={`${Styles.orderNumberInfo}`}>
          <span className='text text_type_digits-default'>#{orderNumber}</span>
          <span className='text text_type_main-default text_color_inactive'>{new Date(orderDate).toLocaleDateString('ru-RU', dateOptions)}</span>
        </div>
        <div className='text text_type_main-small mt-6'>{burgerName}</div>
        {status?(<p className={`${Styles[statusColor]} mt-2 text text_type_main-small`}>{rusStatus}</p>):(<span></span>)}
        <div className={`${Styles.orderContainInfo} mt-6`}>
          <div className={Styles.ingredientsContainer}>
            {burgerIngredients.map((ingredient, index) => {
              if (index > 5) return null;
              if (index === 5)
                return (
                  <div key={uuidv4()} className={`${Styles.ingredient} ${Styles.lastIngredient}`}>
                    <span className={`${Styles.img_text} text text_type_digits-default`}>{`+${burgerIngredients.length - index}`}</span>
                    <img className={`${Styles.img}`} src={ingredient.img || undefinedImg} alt='картинка' />
                  </div>
                );
              return (
                <div className={Styles.ingredient}>
                  <img className={Styles.img} src={ingredient.img || undefinedImg} alt='картинка' />
                </div>
              );
            })}
          </div>
          <span className={`text text_type_digits-default ${Styles.orderCost}`}>
            {orderCost}
            <CurrencyIcon type='primary' />
          </span>
        </div>
      </div>
    </NavLink>
  ) : (
    <div></div>
  );
};

export default Order;
