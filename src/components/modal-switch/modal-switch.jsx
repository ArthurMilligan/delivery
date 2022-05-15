import { Route, Switch, useLocation } from "react-router-dom";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ProtectedRoute from "../protected-route/protected-route";
export const ModalSwitch = ({ children }) => {
    const location = useLocation();
    let background = location.state && location.state.background;
    return (<>
        <Switch location={background || location}>
            {children}
        </Switch>
        {background && <Route path="/ingredients/:id" children={<Modal><IngredientDetails /></Modal>} />}
        {background && <ProtectedRoute path="/profile/order"><Modal><OrderDetails /></Modal></ProtectedRoute>}
    </>
    )
}