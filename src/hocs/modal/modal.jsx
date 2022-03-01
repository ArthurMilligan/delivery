import React from "react";
import { createPortal } from "react-dom";
import style from './modal.module.css'
import PropTypes from 'prop-types';

const modal = document.getElementById('modal')

const Modal = Component => ({...props}) => {
    const closeModal=()=>{
        props.setIsModalOpen(false)
    }
    return createPortal(
        <div className={style.modal}>
            <Component {...props} closeModal={closeModal}/>
        </div>,
        modal)
}

Modal.propTypes = {
    setIsModalOpen:PropTypes.func.isRequired
}

export default Modal