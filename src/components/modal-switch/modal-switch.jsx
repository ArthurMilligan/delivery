import { useRouteMatch } from "react-router-dom";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ProtectedRoute from "../protected-route/protected-route";
export const ModalSwitch = ({ children }) => {
    const history = useHistory()
    const onClose = ()=>{
        history.goBack()
    }
    const location = useLocation();
    const match = useRouteMatch("/profile/:orderNumber");
    const background = location.state && location.state.background;
    return (<>
        <Switch location={background || location}>
            {children}
        </Switch>
        {background && match && <ProtectedRoute path="/profile/:orderNumber"><Modal onClose = {onClose}><OrderDetails /></Modal></ProtectedRoute>}
        {background &&  <Route path="/ingredients/:id" children={<Modal onClose = {onClose}><IngredientDetails /></Modal>} />}
    </>
    )
}