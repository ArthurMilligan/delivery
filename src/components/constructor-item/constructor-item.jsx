import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import style from "./constructor-item.module.css";
import PropTypes from 'prop-types';
import { constructorDataType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

const ConstructorItem = (props) => {
    const ref = useRef(null);
    const dispatch = useDispatch()
    const handleClose = () => dispatch({ type: 'DELETE_PRODUCT', id: props.id })
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
            dispatch({ type: 'MOVE_PRODUCT', hoverIndex, dragIndex })
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
    const opacity = isDragging ? 0 : 1
    drag(drop(ref));
    return (
        <div ref={props.draggable ? ref : null} style={{ opacity }} className={`${props.type ? 'pl-8' : 'pl-2'} ${style.item} mb-4`}>
            {!props.type && (<DragIcon type="primary" />)}
            <ConstructorElement isLocked={props.isLocked}
                type={props.type}
                text={props.text}
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
    id: PropTypes.number
}
export default ConstructorItem