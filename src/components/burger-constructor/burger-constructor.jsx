import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import style from "./burger-constructor.module.css"

const BurgerConstructor = (props) => {
  const data=[
    {
      text:"Краторная булка N-200i (верх)",
      price:200,
      thumbnail:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      isLocked:true,
      type:"top",
    },
    {
      text:"Краторная булка N-200i (верх)",
      price:200,
      thumbnail:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    },
    {
      text:"Краторная булка N-200i (верх)",
      price:200,
      thumbnail:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",

    },
    {
      text:"Краторная булка N-200i (верх)",
      price:200,
      thumbnail:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    },
    {
      text:"Краторная булка N-200i (низ)",
      price:200,
      thumbnail:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      isLocked:true,
      type:"bottom",
    }
  ]
  return <section className={`${style.constructor} pl-10 pb-10 pt-25`}>
    <div className={style.constructorList} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {data.map(i=><ConstructorItem isLocked={i.isLocked}
                            type={i.type}
                            text={i.text}
                            price={i.price}
                            thumbnail={i.thumbnail}
                            />)}
    </div>
    <div className={`${style.order} mt-10`}>
      <div className={`${style.totalPrice} mr-10`}>
        <span className="text text_type_digits-medium">600</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">Оформить заказ</Button>
    </div>
  </section>
}
export default BurgerConstructor