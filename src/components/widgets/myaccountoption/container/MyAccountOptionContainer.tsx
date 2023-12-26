import { useDispatch } from "react-redux";
import { SelectionMenuItem } from "../../../../constants";
import MyAccountOption from "../presentation/MyAccountOption"
import { logOut } from "../../../../store/AuthSlice";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";


const MyAccountOptionContainer = () =>{

    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const logoutUser = async () => {
        const response = await AuthService.logoutService();
        if(response instanceof ApiError){
            //Error
        }
        else{
            dispatch(logOut());
            navigate('/');
        }
    }
    const itemClickHandler = (item: SelectionMenuItem) => {
        switch(item.id){
            case 1: return;
            case 2: {
                //Logout
                logoutUser();
                return;
            }

        }
    }
    return (
        <MyAccountOption itemClickHandler={itemClickHandler} />
    )
}

export default MyAccountOptionContainer;