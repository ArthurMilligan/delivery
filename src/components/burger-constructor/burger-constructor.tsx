import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import ConstructorItem from '../constructor-item/constructor-item';
import style from './burger-constructor.module.css';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useDrop } from 'react-dnd';
import { GET_TOTAL_PRICE } from '../../services/constans/cart-constans';
import { ADD_PRODUCT_ACTION_CREATOR } from '../../services/actions/cart-actions';
import { NavLink, useLocation } from 'react-router-dom';

const BurgerConstructor: FC = () => {
  const location = useLocation();
  const { ingredients, bun } = useSelector((store) => store.cart);
  const items = useSelector((store) => store.items.items);
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'product',
    drop(item: { id: string }) {
      const element = items.find((i) => i._id === item.id);
      if (element) {
        dispatch(ADD_PRODUCT_ACTION_CREATOR(element._id, element.name, element.price, element.image, element.type));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  useEffect(() => {
    dispatch({ type: GET_TOTAL_PRICE });
  }, [ingredients, bun, dispatch]);
  // const styleDrop = {
  //   borderColor:isHover ? 'lightgreen' : 'transparent',
  //   borderWidth: '1px',
  //   borderStyle:'solid'
  // }
  return (
    <section className={`${style.constructor} ml-10 mb-10 mt-25`} ref={dropTarget}>
      <>
        <div className='mb-4'>
          {bun.ingredient_id && (
            <ConstructorItem isLocked={true} draggable={false} type='top' text={bun.name} price={bun.price} thumbnail={bun.thumbnail} />
          )}
        </div>
        <div className={style.constructorList}>
          {ingredients.length ? (
            ingredients.map((i, index) => (
              <ConstructorItem draggable={true} index={index} key={i.id} id={i.id} text={i.name} price={+i.price} thumbnail={i.thumbnail} />
            ))
          ) : (
            <span>Добавте товар</span>
          )}
        </div>
        <div className='mt-4'>
          {bun.ingredient_id && (
            <ConstructorItem draggable={false} type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.thumbnail} />
          )}
        </div>
      </>

      <div className={`${style.order} mt-10`}>
        <div className={`${style.totalPrice} mr-10`}>
          <span className='text text_type_digits-medium'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
        {bun.ingredient_id && (
          <NavLink
            to={{
              pathname: `/profile/order`,
              state: { background: location },
            }}
          >
            <Button type='primary' size='large'>
              Оформить заказ
            </Button>
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
