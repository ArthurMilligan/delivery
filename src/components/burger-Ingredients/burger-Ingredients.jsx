import React, { useRef, useState } from "react";
import SwitchPanel from "../switch-panel/switch-panel";
import ListElement from "../list-element/list-element";
import style from "./burger-Ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import { useSelector } from "react-redux"

const BurgerIngredients = (props) => {
    // const addIngredientInCart=(name,price,img)=>{
    //     props.setConstructorData([...props.constructorData,{id:props.constructorData.length,name,price,thumbnail:img}])
    // }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState({})
    const [currentSwitchPanel, setCurrentSwitchPanel] = useState(0)

    const items = useSelector(store => store.items.items)

    const switchPanelCheckPoint = useRef(null);
    const buns = useRef(null);
    const sauces = useRef(null);
    const mains = useRef(null)

    const handleScroll = (e) => {
        const tmp = [buns, sauces, mains]
        let current, flag = 10000;
        tmp.forEach((i, number) => {
            if (Math.abs(i.current.getBoundingClientRect().y - switchPanelCheckPoint.current.getBoundingClientRect().y) < flag) {
                current = number
                flag = Math.abs(i.current.getBoundingClientRect().y - switchPanelCheckPoint.current.getBoundingClientRect().y)
            }
        })
        setCurrentSwitchPanel(current)
    }
    return (
        <section className={style.section}>
            {isModalOpen && <>
                <Modal setIsModalOpen={setIsModalOpen}><IngredientDetails {...currentIngredient} /></Modal>
            </>}
            <h1 className="mb-5 mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className="mb-10"><SwitchPanel currentSwitchPanel={currentSwitchPanel} setCurrentSwitchPanel={setCurrentSwitchPanel} /></div>
            <div className={style.sectionList} onScroll={handleScroll} ref={switchPanelCheckPoint}>
                <h2 ref={buns} className="mb-6 mt-10 text text_type_main-medium">Булки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {items.map(i => {
                        if (i.type === "bun") return (<ListElement
                            className={style.sectionListItem}
                            setModal={setIsModalOpen}
                            isModalOpen={isModalOpen}
                            id={i._id}
                            key={i._id}
                            type={i.type}
                            img={i.image}
                            price={i.price}
                            name={i.name}
                            imgLarge={i.image_large}
                            calories={i.calories}
                            proteins={i.proteins}
                            fat={i.fat}
                            carbohydrates={i.carbohydrates}
                            setCurrentIngredient={setCurrentIngredient}
                        />)
                        else return null
                    })
                    }
                </div>
                <h2 ref={sauces} className="mb-6 mt-2 text text_type_main-medium">Соусы</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {items.map(i => {
                        if (i.type === "sauce") return (<ListElement
                            className={style.sectionListItem}
                            id={i._id}
                            key={i._id}
                            type={i.type}
                            img={i.image}
                            price={i.price}
                            name={i.name}
                            imgLarge={i.image_large}
                            calories={i.calories}
                            proteins={i.proteins}
                            fat={i.fat}
                            carbohydrates={i.carbohydrates}
                            setCurrentIngredient={setCurrentIngredient}
                            setModal={setIsModalOpen}
                            isModalOpen={isModalOpen}
                        />)
                        else return null
                    })
                    }
                </div>
                <h2 ref={mains} className="mb-6 mt-2 text text_type_main-medium">Начинки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {items.map(i => {
                        if (i.type === "main") return (<ListElement
                            className={style.sectionListItem}
                            id={i._id}
                            type={i.type}
                            key={i._id}
                            img={i.image}
                            price={i.price}
                            name={i.name}
                            imgLarge={i.image_large}
                            calories={i.calories}
                            proteins={i.proteins}
                            fat={i.fat}
                            carbohydrates={i.carbohydrates}
                            setCurrentIngredient={setCurrentIngredient}
                            setModal={setIsModalOpen}
                            isModalOpen={isModalOpen}
                        />)
                        else return null
                    })
                    }
                </div>
            </div>
        </section>
    )
}
export default BurgerIngredients