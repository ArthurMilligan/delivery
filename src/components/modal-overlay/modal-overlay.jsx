import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import style from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const modal=document.getElementById('modal')

const ModalOverlay = (props) =>{
    const pressEscListener = useCallback((event) => {
        let newState=true
        if (event.key === "Escape") {
          newState=false
        }
        props.setIsModalOpen(newState);
      }, []);
    const closeOnClick =()=>{
        props.setIsModalOpen(false);
    }
    useEffect(() => {
        document.addEventListener("keydown", pressEscListener, false);    
        return () => {
          document.removeEventListener("keydown", pressEscListener, false);
        };
      }, []);
    return createPortal (
        <div className={style.overflow} onClick={()=>{closeOnClick()}}>
        </div>,
        modal
    )
}

ModalOverlay.propTypes = {
    setIsModalOpen:PropTypes.func.isRequired
}
export default ModalOverlay