import React from "react";
import SwitchPanel from "../switch-panel/switch-panel";
import ListElement from "../list-element/list-element";
import style from "./burger-Ingredients.module.css";

const BurgerIngredients=(props)=>{
    return(
        <section className={style.section}>
            <h1 className="mb-5 mt-10">Соберите бургер</h1>
            <div className="mb-10"><SwitchPanel/></div>
            <div className={style.sectionList}>
                <h2 className="mb-6 mt-10">Булки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="bun") return <ListElement className={style.sectionListItem} key={i["_id"]} img={i["image"]} price={i["price"]} name={i["name"]}/>
                        else return null
                        })
                    }
                </div>
                <h2 className="mb-6 mt-2">Соусы</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="sauce") return <ListElement className={style.sectionListItem} key={i["_id"]} img={i["image"]} price={i["price"]} name={i["name"]}/>
                        else return null
                        })
                    }
                </div>
                <h2 className="mb-6 mt-2">Начинки</h2>
                <div className={`${style.sectionListItems} pl-4`}>
                    {props.data.map(i=>{
                        if(i["type"]==="main") return <ListElement className={style.sectionListItem} key={i["_id"]} img={i["image"]} price={i["price"]} name={i["name"]}/>
                        else return null
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default BurgerIngredients