import style from './modal-overlay.module.css'


const ModalOverlay = (props) => {
  return (
    <div className={style.overflow} onClick={() => { props.history.goBack(); }}>
    </div>
  )
}

export default ModalOverlay