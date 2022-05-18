import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import style from "./constructor-item.module.css";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_PRODUCT_ACTION_CREATOR, MOVE_PRODUCT_ACTION_CREATOR } from "../../services/actions/cart-actions";

const ConstructorItem = (props) => {
    const ref = useRef(null);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(DELETE_PRODUCT_ACTION_CREATOR(props.id))
    const [, drop] = useDrop({
        accept: 'constructor',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(MOVE_PRODUCT_ACTION_CREATOR(hoverIndex, dragIndex))
            item.index = hoverIndex
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'constructor',
        item: () => {
            return { index: props.index }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    const defineBun = (type) => {
        switch (type) {
            case 'top':
                return ' (верх)'
            case 'bottom':
                return ' (низ)'
            default:
                return ''
        }
    }
    const opacity = isDragging ? 0 : 1
    drag(drop(ref));
    return (
        <div ref={props.draggable ? ref : null} style={{ opacity }} className={`${props.type ? 'pl-8' : 'pl-2'} ${style.item} mb-4`}>
            {!props.type && (<DragIcon type="primary" />)}
            <ConstructorElement isLocked={props.isLocked}
                type={props.type}
                text={`${props.text}` + defineBun(props.type)}
                price={props.price}
                thumbnail={props.thumbnail}
                handleClose={handleClose}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    index: PropTypes.number,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string
}
export default ConstructorItem