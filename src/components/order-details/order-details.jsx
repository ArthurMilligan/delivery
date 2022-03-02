import React from "react";
import style from './order-details.module.css';
import done from '../../images/done.png'

const OrderDetails = (props) => {
    return (
        <>
            <div className={style.block}>
                <span className={`${style.mainText} mt-30 text text_type_digits-large`}>000001</span>
                <span className="mt-8 text text_type_main-medium">Идентификатор заказа</span>
                <span className="mt-15"><img src={done} /></span>
                <span className="mt-15 text text_type_main-default">Ваш заказ начали готовить</span>
                <span className="mt-2 mb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
            </div>
        </>

    )
}


export default OrderDetails