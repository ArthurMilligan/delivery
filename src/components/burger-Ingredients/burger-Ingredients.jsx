import React, { useState } from "react";
import SwitchPanel from "../switch-panel/switch-panel";
import ListElement from "../list-element/list-element";
import style from "./burger-Ingredients.module.css";
import Modal from "../../hocs/modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import PropTypes from 'prop-types';

const BurgerIngredients=(props)=>{
    // const addIngredientInCart=(name,price,img)=>{
    //     props.setConstructorData([...props.constructorData,{id:props.constructorData.length,name,price,thumbnail:img}])
    // }

    const [isModalOpen,setIsModalOpen]=useState(false);
    const [currentIngredient,setCurrentIngredient]=useState({})

    const ModalIngredientDetails=Modal(IngredientDetails);
    
    return(
        <section className={style.section}>
            {isModalOpen&&<>
                <ModalOverlay setIsModalOpen={setIsModalOpen}/>
                <ModalIngredientDetails setIsModalOpen={setIsModalOpen} {...currentIngredient}/>
            </>}  
            <h1 className="mb-5 mt-10 text text_type_main-large">Соберите бургер</h1>
            <div className="mb-10"><SwitchPanel/></div>
            <div className={style.sectionList}>
                <h2 className="mb-6 mt-10 text text_type_main-medium">Булки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="bun") return <ListElement 
                                                        className={style.sectionListItem}
                                                        setModal={setIsModalOpen}
                                                        isModalOpen={isModalOpen}
                                                        constructorData={props.constructorData} 
                                                        key={i["_id"]} 
                                                        img={i["image"]} 
                                                        price={i["price"]} 
                                                        name={i["name"]}
                                                        imgLarge={i["image_large"]}
                                                        calories={i["calories"]}
                                                        proteins={i["proteins"]}
                                                        fat={i["fat"]}
                                                        carbohydrates={i["carbohydrates"]}
                                                        setCurrentIngredient={setCurrentIngredient}
                                                    />
                        else return null
                        })
                    }
                </div>
                <h2 className="mb-6 mt-2 text text_type_main-medium">Соусы</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="sauce") return <ListElement 
                                                            className={style.sectionListItem} 
                                                            constructorData={props.constructorData} 
                                                            key={i["_id"]} 
                                                            img={i["image"]} 
                                                            price={i["price"]} 
                                                            name={i["name"]}
                                                            imgLarge={i["image_large"]}
                                                            calories={i["calories"]}
                                                            proteins={i["proteins"]}
                                                            fat={i["fat"]}
                                                            carbohydrates={i["carbohydrates"]}
                                                            setCurrentIngredient={setCurrentIngredient}
                                                            setModal={setIsModalOpen}
                                                            isModalOpen={isModalOpen}
                                                        />
                        else return null
                        })
                    }
                </div>
                <h2 className="mb-6 mt-2 text text_type_main-medium">Начинки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="main") return <ListElement 
                                                            className={style.sectionListItem} 
                                                            constructorData={props.constructorData} 
                                                            key={i["_id"]} 
                                                            img={i["image"]} 
                                                            price={i["price"]}
                                                            name={i["name"]}
                                                            imgLarge={i["image_large"]}
                                                            calories={i["calories"]}
                                                            proteins={i["proteins"]}
                                                            fat={i["fat"]}
                                                            carbohydrates={i["carbohydrates"]}
                                                            setCurrentIngredient={setCurrentIngredient}
                                                            setModal={setIsModalOpen}
                                                            isModalOpen={isModalOpen}
                                                        />
                        else return null
                        })
                    }
                </div>
            </div>
        </section>
    )
}
BurgerIngredients.propTypes={
    constructorData: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.number.isRequired,
      name:PropTypes.string.isRequired,
      price:PropTypes.number.isRequired,
      thumbnail:PropTypes.string.isRequired
    }).isRequired).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        _id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        proteins:PropTypes.number.isRequired,
        fat:PropTypes.number.isRequired,
        carbohydrates:PropTypes.number.isRequired,
        calories:PropTypes.number.isRequired,
        price:PropTypes.number.isRequired,
        image:PropTypes.string.isRequired,
        image_mobile:PropTypes.string.isRequired,
        image_large:PropTypes.string.isRequired,
        __v:PropTypes.number.isRequired,
    }))
  }
export default BurgerIngredients