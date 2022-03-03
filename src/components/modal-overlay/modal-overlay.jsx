import React from "react";
import style from './modal-overlay.module.css'
import PropTypes from 'prop-types';


const ModalOverlay = (props) => {
  return (
    <div className={style.overflow} onClick={() => { props.setIsModalOpen(false) }}>
    </div>
  )
}

ModalOverlay.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired
}
export default ModalOverlay