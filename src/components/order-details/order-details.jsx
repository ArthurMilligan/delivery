import { useEffect } from "react";
import style from './order-details.module.css';
import done from '../../images/done.png'

import { useDispatch } from "react-redux";
import { getOrder } from "../../services/actions/order-actions";
import { useSelector } from "react-redux";
import Loading from "../loading/loading";

const OrderDetails = (props) => {
    const dispatch = useDispatch()
    const constructorData = useSelector(store => store.cart.ingredients)
    const bun = useSelector(store => store.cart.bun)
    const order = useSelector(store => store.order)

    useEffect(() => {
        const constructorDataToRequest = [bun.ingredient_id, ...constructorData.map(i => i.ingredient_id), bun.ingredient_id]
        dispatch(getOrder(constructorDataToRequest))
    }, [])
    return (
        <div className={style.block}>
            {order.orderRequest && (<Loading />)}
            {order.orderRequestFailed && (<div>Ошибка(</div>)}
            {!order.orderRequest && !order.orderRequestFailed ?
                (<>
                    <span className={`${style.mainText} mt-30 text text_type_digits-large`}>{order.orderDetails.number}</span>
                    <span className="mt-8 text text_type_main-medium">Идентификатор заказа</span>
                    <span className="mt-15"><img src={done} /></span>
                    <span className="mt-15 text text_type_main-default">Ваш заказ начали готовить</span>
                    <span className="mt-2 mb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
                </>)
                : (<div></div>)}
        </div>

    )
}


export default OrderDetails