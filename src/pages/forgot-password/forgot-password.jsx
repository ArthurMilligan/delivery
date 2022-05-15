import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { forgotPassword } from "../../services/actions/password-actions";
import Styles from './forgot-password.module.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const resetEmailSent = useSelector(store => store.password.isResetEmailSent)
    const history = useHistory()
    const loginOnClick = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history])
    const resetOnClick = () => {
        dispatch(forgotPassword(email))
    }

    return (
        <Route>
            {resetEmailSent
                ? (<Redirect to='/reset-password' />)
                : (<div className={Styles.forgotPasswordBlock}>
                    <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                    <div className="mt-6">
                        <Input
                            type={'text'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={'email'}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="primary" size="medium" onClick={resetOnClick}>Восстановить</Button>
                    </div>
                    <div className="mt-20">
                        <span className="text text_type_main-default text_color_inactive">
                            Вспомнили пароль?
                        </span>
                        <Button type="secondary" size="medium" onClick={loginOnClick}>
                            Войти
                        </Button>
                    </div>
                </div>)}
        </Route>
    )
}
export default ForgotPassword