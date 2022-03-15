import React, { useContext, useEffect, useState } from "react";
import style from './order-details.module.css';
import done from '../../images/done.png'
import axios from 'axios';
import { constructorDataType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { getOrder } from "../../services/actions/order-actions";
import { useSelector } from "react-redux";

const OrderDetails = (props) => {
    const dispatch = useDispatch()
    const constructorData = useSelector(store => store.cart.ingredients)
    const bun = useSelector(store=>store.cart.bun)
    const order = useSelector(store => store.order)
    console.log(constructorData)

    useEffect(() => {
        const constructorDataToRequest = [bun.ingredient_id,...constructorData.map(i => i.ingredient_id),bun.ingredient_id]
        dispatch(getOrder(constructorDataToRequest))
    }, [])
    return (
        !order.orderRequest && !order.orderRequestFailed ?
            (<div className={style.block}>
                <span className={`${style.mainText} mt-30 text text_type_digits-large`}>{order.orderDetails.number}</span>
                <span className="mt-8 text text_type_main-medium">Идентификатор заказа</span>
                <span className="mt-15"><img src={done} /></span>
                <span className="mt-15 text text_type_main-default">Ваш заказ начали готовить</span>
                <span className="mt-2 mb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
            </div>)
            : (<div></div>)
    )
}

OrderDetails.propTypes = {
    constructorData: constructorDataType
}

export default OrderDetails