import { LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./actions/types";
import { store } from './App'

const AuthRouteGuard = {
    shouldRoute() {
        if (sessionStorage.getItem('Authorization')) {
            store.dispatch({
                type: LOGIN_USER_SUCCESS
            })

            return true;
        } else {
            store.dispatch({
                type: LOGIN_USER_ERROR,
                payload: true
            })

            return false;
        }
    }
}

export default AuthRouteGuard