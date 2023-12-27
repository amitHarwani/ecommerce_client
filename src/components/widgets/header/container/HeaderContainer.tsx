import React, { ForwardedRef, useCallback, useEffect, useState } from "react";
import Header from "../presentation/Header";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../../../../store/AuthSlice";
import { NavigationOption } from "../../../../constants";
import { getNavigationItemList } from "../../../../data/applicationData";
import { useAppSelector } from "../../../../store";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const [navigationList, setNavigationList] = useState<NavigationOption[]>([]);

  const logoClickHandler = () => {
    navigate("/");
  };

  const fetchUser = useCallback( async () => {
    const response = await AuthService.getCurrentUser();
    if(response instanceof ApiError){
      //Error
      dispatch(logOut());
      setNavigationList(getNavigationItemList(false));
    }
    else{
      dispatch(logIn(response));
      setNavigationList(getNavigationItemList(true));
    }
  }, [dispatch])

  useEffect(() => {
    fetchUser();
  }, [fetchUser, isLoggedIn])

  return <Header ref={ref} logoClickHandler={logoClickHandler} navItemList={navigationList} />;
});
export default HeaderContainer;
