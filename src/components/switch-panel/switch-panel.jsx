import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
const SwitchPanel = (props) => {
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={props.currentSwitchPanel === 0} onClick={props.setCurrentSwitchPanel}>
                Булки
            </Tab>
            <Tab value="two" active={props.currentSwitchPanel === 1} onClick={props.setCurrentSwitchPanel}>
                Соусы
            </Tab>
            <Tab value="three" active={props.currentSwitchPanel === 2} onClick={props.setCurrentSwitchPanel}>
                Начинки
            </Tab>
        </div>
    )
}
SwitchPanel.propTypes = {
    currentSwitchPanel: PropTypes.number.isRequired,
    setCurrentSwitchPanel:PropTypes.func.isRequired
}

export default SwitchPanel