import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import style from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_PRODUCT_ACTION_CREATOR, GET_TOTAL_PRICE } from "../../services/actions/cart-actions";

const BurgerConstructor = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ingredients, bun } = useSelector(store => store.cart)
  const items = useSelector(store => store.items.items)
  const dispatch = useDispatch();
  const totalPrice = useSelector(store => store.cart.totalPrice)
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'product',
    drop(item) {
      const element = items.find(i => i._id === item.id);
      dispatch(
        ADD_PRODUCT_ACTION_CREATOR(element._id, element.name, element.price, element.image, element.type)
      )
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })
  useEffect(() => {
    dispatch({ type: GET_TOTAL_PRICE })
  }, [ingredients, bun])
  // const styleDrop = {
  //   borderColor:isHover ? 'lightgreen' : 'transparent',
  //   borderWidth: '1px',
  //   borderStyle:'solid'
  // }
  return (
    <section className={`${style.constructor} ml-10 mb-10 mt-25`} ref={dropTarget}>
      {isModalOpen && (<Modal setIsModalOpen={setIsModalOpen} ><OrderDetails /></Modal>)}
      <>
        <div className="mb-4">
          {!!Object.keys(bun).length &&
            (<ConstructorItem
              isLocked={true}
              draggable={false}
              type='top'
              text={bun.name}
              price={bun.price}
              thumbnail={bun.thumbnail}
            />)
          }
        </div>
        <div className={style.constructorList}  >
          {ingredients.length
            ?
            (ingredients.map((i, index) => {
              if (!i.isBun) return (
                <ConstructorItem
                  draggable={true}
                  index={index}
                  key={i.id}
                  id={i.id}
                  text={i.name}
                  price={+i.price}
                  thumbnail={i.thumbnail}
                  constructorData={ingredients}
                />)
              else return null
            }))
            : (<span>Добавте товар</span>)}
        </div>
        <div className="mt-4">
          {!!Object.keys(bun).length &&
            (<ConstructorItem
              draggable={false}
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.thumbnail}
            />)
          }
        </div>
      </>

      <div className={`${style.order} mt-10`}>
        <div className={`${style.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        {!!Object.keys(bun).length &&
          (<Button onClick={() => { setIsModalOpen(true) }} type="primary" size="large">Оформить заказ</Button>)
        }
      </div>
    </section>
  );
}

export default BurgerConstructor