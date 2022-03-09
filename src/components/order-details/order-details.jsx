import React, { useContext, useEffect, useState } from "react";
import style from './order-details.module.css';
import done from '../../images/done.png'
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import axios from 'axios';
import { constructorDataType } from "../../utils/types";


const OrderDetails = (props) => {
    const [isOrderFetching, setIsOrderFetching] = useState(false)
    const [response, setResponse] = useState({})
    const { constructorData } = useContext(BurgerConstructorContext)
    const constructorDataToRequest = constructorData.map(i => i.id)
    useEffect(() => {
        try {
            axios.post('https://norma.nomoreparties.space/api/orders', { "ingredients": constructorDataToRequest })
                .then(res => {
                    setResponse(res.data)
                    setIsOrderFetching(true)
                })
        } catch {
            console.log('ошибка(')
        }
        return(()=>{
            setResponse({})
            setIsOrderFetching(false)
        })
    }, [])
    return (
        isOrderFetching ?
            (<div className={style.block}>
                <span className={`${style.mainText} mt-30 text text_type_digits-large`}>{response.order.number}</span>
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