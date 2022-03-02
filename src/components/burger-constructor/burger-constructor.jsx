import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import style from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { constructorDataType } from "../../utils/types";

const BurgerConstructor = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={`${style.constructor} pl-10 pb-10 pt-25`}>
      {isModalOpen && (<Modal setIsModalOpen={setIsModalOpen}><OrderDetails /></Modal>)}
      <div className="mb-4">
        <ConstructorItem
          isLocked={true}
          type='top'
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={style.constructorList}>
        {props.constructorData.length
          ? props.constructorData.map(i => (<ConstructorItem
            key={i.id}
            id={i.id}
            text={i.name}
            price={i.price}
            thumbnail={i.thumbnail}
            setConstructorData={props.setConstructorData}
            constructorData={props.constructorData}
          />))
          : (<span>Добавте товар</span>)}
      </div>
      <div className="mt-4">
        <ConstructorItem
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={`${style.order} mt-10`}>
        <div className={`${style.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium">{props.constructorData.reduce((acc, b) => acc + b.price, 0)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => { setIsModalOpen(true) }} type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = {
  constructorData: constructorDataType
}
export default BurgerConstructor