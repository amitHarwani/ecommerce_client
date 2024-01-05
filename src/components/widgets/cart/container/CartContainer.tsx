import { useMemo } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  addOrUpdateToCartThunk,
  removeFromCartThunk,
} from "../../../../store/CartSlice";
import Cart from "../presentation/Cart";
import FullPageLoadingSpinner from "../../../basic/FullPageLoadingSpinner";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { ROUTE_PATHS } from "../../../../constants";

const CartContainer = () => {

  const navigate = useCustomNavigate();

  const userCart = useAppSelector((state) => state.cart.userCart);

  const isAddOrUpdateToCartInProgress = useAppSelector(
    (state) => state.cart.isAddOrUpdateToCartInProgress
  );

  const isRemoveFromCartInProgress = useAppSelector(
    (state) => state.cart.isRemoveFromCartInProgress
  );

  const isLoading = useMemo(() => {
    if (isAddOrUpdateToCartInProgress || isRemoveFromCartInProgress) {
      return true;
    }
    return false;
  }, [isAddOrUpdateToCartInProgress, isRemoveFromCartInProgress]);

  const dispatch = useAppDispatch();

  const onQuantityChanged = (product: Product, quantity: number) => {
    dispatch(
      addOrUpdateToCartThunk({ productId: product._id, quantity: quantity })
    );
  };

  const removeFromCart = (product: Product) => {
    dispatch(removeFromCartThunk({ productId: product._id }));
  };

  const checkoutClickHandler = () => {
    navigate(ROUTE_PATHS.checkout, false, {isFromCartPage: true});
  };
  return (
    <>
      {isLoading && <FullPageLoadingSpinner />}
      <Cart
        cart={userCart}
        onQuantityChanged={onQuantityChanged}
        removeFromCart={removeFromCart}
        checkoutClickHandler={checkoutClickHandler}
      />
    </>
  );
};

export default CartContainer;
