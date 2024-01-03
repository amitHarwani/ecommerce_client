import { useEffect } from "react";
import LoginPage from "../presentation/LoginPage"
import { useAppSelector } from "../../../store";
import useCustomNavigate from "../../../hooks/useCustomNavigate";


const LoginPageContainer = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const navigate = useCustomNavigate();

    /* If the user is logged in navigate to home */
    useEffect(() => {
        if(isLoggedIn){
            navigate("/", false);
        }
    }, [isLoggedIn, navigate])
    return (
        <LoginPage />
    )
}

export default LoginPageContainer;