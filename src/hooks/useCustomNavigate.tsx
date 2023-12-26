import { useMemo } from "react";
import { To, useLocation, useNavigate } from "react-router-dom"


/* Stores previous pathname in state */
const useCustomNavigate = () => {

    const {pathname, search} = useLocation();

    const currentPath = useMemo(() => {
        return `${pathname}${search}`
    }, [pathname, search])

    const navigate = useNavigate();

    const customNavigate = (navigateParams: To) => {
        navigate(navigateParams, {state: {previousRoute: currentPath}})
    }

    return customNavigate;
}

export default useCustomNavigate;