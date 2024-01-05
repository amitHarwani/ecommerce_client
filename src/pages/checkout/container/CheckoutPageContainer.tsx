import { useEffect, useMemo } from "react";
import CheckoutPage from "../presentation/CheckoutPage"
import { useLocation } from "react-router-dom";
import useCustomNavigate from "../../../hooks/useCustomNavigate";


const CheckoutPageContainer = () => {

    const navigate = useCustomNavigate();
    const location = useLocation();

    const isFromCartPage = useMemo(() => {
        return location.state?.isFromCartPage;
    }, [location])

    useEffect(() => {
        /* User can only come to checkout page from cart page */
        if(!isFromCartPage){
            navigate("/", true);
        }

    }, [isFromCartPage, navigate])

    return (
        <CheckoutPage />
    )
}

export default CheckoutPageContainer;