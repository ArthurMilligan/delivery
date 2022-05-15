import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registration } from "../../services/actions/auth-actions";
import Styles from './registration.module.css'


const Registration = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loginOnClick = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history])
    const [registrationData, setRegistrationData] = useState({ email: '', password: '', name: '' })
    const registrationOnClick = (e) => {
        dispatch(registration({ ...registrationData }))
    }

    return (
        <div className={Styles.registrationBlock}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <div className="mt-6">
                <Input
                    onChange={e => setRegistrationData({ ...registrationData, name: e.target.value })}
                    value={registrationData.name}
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>
            <div className="mt-6">
                <Input
                    onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })}
                    value={registrationData.email}
                    type={'email'}
                    placeholder={'Email'}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>
            <div className="mt-6">
                <PasswordInput
                    value={registrationData.password}
                    name={'password'}
                    onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
                />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium" onClick={registrationOnClick}>Зарегистрироваться</Button>
            </div>
            <div className="mt-20">
                <span className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                </span>
                <Button type="secondary" size="medium" onClick={loginOnClick}>
                    Войти
                </Button>
            </div>
        </div>
    )
}
export default Registration