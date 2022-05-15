import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileInfo from "../../components/profile-info/profile-info";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import Styles from "./profile.module.css"

const Profile = () => {
    const { url } = useRouteMatch();
    return (<div className={Styles.Profile}>
        <ProfileNavigation url={url} />
        <div className={Styles.changeProfileBlock}>
            <Switch>
                <Route exact={true} path={`${url}/`}>
                    <ProfileInfo />
                </Route>
                <Route path={`${url}/orders`}>
                    <div>Пока не готово :D</div>
                </Route>
            </Switch>
        </div>
    </div>)
}

export default Profile