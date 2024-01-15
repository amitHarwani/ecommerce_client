import { useEffect } from "react";
import LoginPage from "../presentation/LoginPage"
import store from "../../../store";
import useCustomNavigate from "../../../hooks/useCustomNavigate";


const LoginPageContainer = () => {

    const navigate = useCustomNavigate();

    /* If the user is logged in navigate to home */
    useEffect(() => {
        if(store.getState().auth.isLoggedIn){
            navigate("/", false);
        }
    },  [navigate])
    return (
        <LoginPage />
    )
}

export default LoginPageContainer;