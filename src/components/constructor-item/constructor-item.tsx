import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useRef } from 'react';
import style from './constructor-item.module.css';
import { useDispatch } from '../../services/types/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_PRODUCT_ACTION_CREATOR, MOVE_PRODUCT_ACTION_CREATOR } from '../../services/actions/cart-actions';
import { IConstructorItemProps } from '../../utils/types';

const ConstructorItem: FC<IConstructorItemProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleClose = () => (props.id ? dispatch(DELETE_PRODUCT_ACTION_CREATOR(props.id)) : null);
  const [, drop] = useDrop({
    accept: 'constructor',
    hover: (item: { index: number }, monitor) => {
      if (!ref.current || !props.index) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset !== null ? clientOffset.y - hoverBoundingRect.top : 0;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(MOVE_PRODUCT_ACTION_CREATOR(hoverIndex, dragIndex));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: () => {
      return { index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const defineBun = (type: string = ''): string => {
    switch (type) {
      case 'top':
        return ' (верх)';
      case 'bottom':
        return ' (низ)';
      default:
        return '';
    }
  };
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={props.draggable ? ref : null} style={{ opacity }} className={`${props.type ? 'pl-8' : 'pl-2'} ${style.item} mb-4`}>
      {!props.type && <DragIcon type='primary' />}
      <ConstructorElement
        isLocked={props.isLocked}
        type={props.type}
        text={`${props.text}` + defineBun(props.type)}
        price={props.price}
        thumbnail={props.thumbnail}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ConstructorItem;
