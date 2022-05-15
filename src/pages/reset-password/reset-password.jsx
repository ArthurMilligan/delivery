import { Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/actions/password-actions";
import Styles from './reset-password.module.css'


const ResetPassword = () => {
    const [resetData, setResetData] = useState({ password: '', token: '' })
    const [visiblePassword, setVisiblePassword] = useState(false)
    const isPasswordReset = useSelector(store => store.password.isPasswordReset)
    const resetEmailSent = useSelector(store => store.password.isResetEmailSent)
    const dispatch = useDispatch()
    const history = useHistory()
    const loginOnClick = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history])
    const resetOnClick = () => {
        dispatch(resetPassword({ ...resetData }))
    }
    if(!resetEmailSent){
        return(<Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />)
    }

    return (<Route>
        {isPasswordReset
            ? (<Redirect to='/login' />)
            : (<div className={Styles.resetPasswordBlock}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div className="mt-6">
                    <Input
                        type={visiblePassword ? 'text' : 'password'}
                        placeholder={'Введите новый пароль'}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        icon={visiblePassword ? 'HideIcon' : "ShowIcon"}
                        value={resetData.password}
                        onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
                        onIconClick={() => setVisiblePassword(!visiblePassword)}
                    />
                </div>
                <div className="mt-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        value={resetData.token}
                        onChange={(e) => setResetData({ ...resetData, token: e.target.value })}
                    />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="medium" onClick={resetOnClick}>Сохранить</Button>
                </div>
                <div className="mt-20">
                    <span className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </span>
                    <Button type="secondary" size="medium" onClick={loginOnClick}>
                        Войти
                    </Button>
                </div>
            </div>)
        }
    </Route>)
}
export default ResetPassword