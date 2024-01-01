import React, { ForwardedRef, useCallback, useEffect, useState } from "react";
import Header from "../presentation/Header";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import { logIn, logOut } from "../../../../store/AuthSlice";
import { NavigationOption } from "../../../../constants";
import { getNavigationItemList } from "../../../../data/applicationData";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getUserCartThunk } from "../../../../store/CartSlice";

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

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser();
    if (!(response instanceof ApiError)) {
      dispatch(logIn(response));
    } else {
      dispatch(logOut());
    }
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
    />
  );
});
export default HeaderContainer;
