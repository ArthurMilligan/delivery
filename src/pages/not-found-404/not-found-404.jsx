import Styles from './not-found-404.module.css'
const NotFound404 = () => {
    return (
        <div className={Styles.notFoundBlock}>
            <img src={require('../../images/404.png')}/>
            <span className="text text_type_main-large">Что-то пошло не так(</span>
        </div>
            
        )
}
export default NotFound404