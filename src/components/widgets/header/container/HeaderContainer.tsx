import React, { ForwardedRef, useCallback, useEffect, useState } from "react";
import Header from "../presentation/Header";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import { logIn, logOut, updateLoginCheckDone } from "../../../../store/AuthSlice";
import { NavigationOption, ROUTE_PATHS } from "../../../../constants";
import { getNavigationItemList } from "../../../../data/applicationData";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getUserCartThunk, resetCartSlice } from "../../../../store/CartSlice";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userCart = useAppSelector((state) => state.cart.userCart);

  const [navigationList, setNavigationList] = useState<NavigationOption[]>([]);

  const logoClickHandler = () => {
    navigate("/");
  };

  const cartClickHandler = () => {
    navigate(ROUTE_PATHS.cart);
  }

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser();
    if (!(response instanceof ApiError)) {
      dispatch(logIn(response));
    } else {
      dispatch(logOut());
    }
    dispatch(updateLoginCheckDone(true))
  }, [dispatch]);

  /* Fetch Current User: To determine login status */
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /* Fetch Users' Cart, when isLoggedIn flag changes in redux */
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserCartThunk());
    }
    else{
      /* Reset Cart Slice as user is logged out */
      dispatch(resetCartSlice());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setNavigationList(getNavigationItemList(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <Header
      ref={ref}
      logoClickHandler={logoClickHandler}
      navItemList={navigationList}
      itemsInCart={userCart ? userCart.items.length : 0}
      cartClickHandler={cartClickHandler}
    />
  );
});
export default HeaderContainer;
