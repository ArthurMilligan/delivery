import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation,Redirect, Route } from "react-router-dom"
import { getUserInformation, updateToken } from "../../services/actions/auth-actions"

const ProtectedRouteLogined = ({ children, ...rest }) => {
    const isAuth = useSelector(store => store.auth.isAuth)
    const location = useLocation()
    const getUserStatusFailed = useSelector(store => store.auth.getUserInfo.getUserRequestFailed)
    const dispatch = useDispatch()
    const lastLocation=location && location.state && location.state.from
    useEffect(() => {
        dispatch(getUserInformation())
        if (getUserStatusFailed) {
            dispatch(updateToken())
            dispatch(getUserInformation())
        }
    }, [isAuth,getUserStatusFailed,dispatch])
    return (
        <Route
            {...rest}
            render={() => !isAuth ? (
                children
            ) : (
                <Redirect
                    to={lastLocation?location.state.from.pathname:'/'}
                />
            )
            }
        />
    )
}
export default ProtectedRouteLogined