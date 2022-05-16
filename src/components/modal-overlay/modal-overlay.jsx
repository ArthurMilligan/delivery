import style from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return (
    <div className={style.overflow} onClick={() => props.onClose()}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose:PropTypes.func.isRequired
}

export default ModalOverlay