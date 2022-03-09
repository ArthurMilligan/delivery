import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useEffect, useState } from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import style from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContextType } from "../../utils/types";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";

const BurgerConstructor = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { constructorData, setConstructorData } = useContext(BurgerConstructorContext)
  const [bun, setBun] = useState({});
  useEffect(() => {
    setBun(constructorData.filter(i => i.isBun === true)[0])
  }, [constructorData])
  return (
    <section className={`${style.constructor} pl-10 pb-10 pt-25`}>
      {isModalOpen && (<Modal setIsModalOpen={setIsModalOpen} ><OrderDetails/></Modal>)}
      {constructorData.length&&Object.keys(bun).length
        ? (<>
          <div className="mb-4">
            <ConstructorItem
              isLocked={true}
              type='top'
              text={bun.name}
              price={bun.price}
              thumbnail={bun.thumbnail}
            />
          </div>
          <div className={style.constructorList}>
            {constructorData.map(i => {
              if (!i.isBun) return (
                <ConstructorItem
                  key={i.id}
                  id={i.id}
                  text={i.name}
                  price={i.price}
                  thumbnail={i.thumbnail}
                  setConstructorData={setConstructorData}
                  constructorData={constructorData}
                />)
              else return null
            })
            }
          </div>
          <div className="mt-4">
            <ConstructorItem
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.thumbnail}
            />
          </div>
        </>)
        : (<span>Добавте товар</span>)}
      <div className={`${style.order} mt-10`}>
        <div className={`${style.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium">{constructorData.reduce((acc, b) => acc + b.price, 0)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => { setIsModalOpen(true) }} type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = {
  BurgerConstructorContext: BurgerConstructorContextType
}
export default BurgerConstructor