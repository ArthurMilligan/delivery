import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './list-element.module.css';
import { useSelector } from '../../services/types/hooks';
import { useDrag } from 'react-dnd';
import { NavLink, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { ICart, IListElementProps } from '../../utils/types';

const ListElement: FC<IListElementProps> = (props) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: 'product',
    item: { id: props.id },
  });
  const cart: Array<ICart> = [...useSelector((store) => store.cart.ingredients), useSelector((store) => store.cart.bun)];
  const count = cart.reduce((acc, a) => (a.name === props.name ? acc + 1 : acc), 0);
  return (
    <NavLink
      className={`${style.link} mb-8 mr-6 pr-4 pl-4`}
      to={{
        pathname: `/ingredients/${props.id}`,
        state: { background: location },
      }}
    >
      <div className={`${style.item}`} ref={dragRef}>
        {count > 0 && <Counter count={count} size='default' />}
        <img className={`${style.img} mb-1`} src={props.img} alt='burger' />
        <div>
          <span className='text text_type_digits-default mb-1'>{props.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <span className={`${style.name} text text_type_main-small`}>{props.name}</span>
      </div>
    </NavLink>
  );
};

export default ListElement;
