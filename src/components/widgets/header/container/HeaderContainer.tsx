import React, { ForwardedRef, useCallback, useEffect, useState } from "react";
import Header from "../presentation/Header";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import { useDispatch } from "react-redux";
import { logIn, logOut, updateUserCart } from "../../../../store/AuthSlice";
import { NavigationOption } from "../../../../constants";
import { getNavigationItemList } from "../../../../data/applicationData";
import { useAppSelector } from "../../../../store";
import CartService from "../../../../services/CartService";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userCart = useAppSelector(state => state.auth.userCart);

  const [navigationList, setNavigationList] = useState<NavigationOption[]>([]);

  const logoClickHandler = () => {
    navigate("/");
  };

  const fetchUserCart = useCallback(async () => {
    const response = await CartService.getUserCart();
    if (!(response instanceof ApiError)) {
      dispatch(updateUserCart(response));
    }
    else{
      dispatch(logOut());
    }
  }, [dispatch]);

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser();
    if (!(response instanceof ApiError)) {
      dispatch(logIn(response));
    }
    else{
      dispatch(logOut());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchUserCart();
  }, [fetchUserCart]);

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
