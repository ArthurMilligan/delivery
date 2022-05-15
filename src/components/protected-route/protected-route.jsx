import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import { getUserInformation, updateToken } from "../../services/actions/auth-actions"

const ProtectedRoute = ({ children, ...rest }) => {
    const isAuth = useSelector(store => store.auth.isAuth)
    const getUserStatusFailed = useSelector(store => store.auth.getUserInfo.getUserRequestFailed)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserInformation())
        if (getUserStatusFailed) {
            dispatch(updateToken())
            dispatch(getUserInformation())
        }
    }, [isAuth,dispatch,getUserStatusFailed])
    return (
        <Route
            {...rest}
            render={() => isAuth ? (
                children
            ) : (
                <Redirect
                    to='/login'
                />
            )
            }
        />
    )
}
export default ProtectedRoute