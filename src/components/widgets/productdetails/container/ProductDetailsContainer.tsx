import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductDetails from "../presentation/ProductDetails";
import ProductService from "../../../../services/ProductService";
import ApiError from "../../../../services/ApiError";
import { useAppDispatch, useAppSelector } from "../../../../store";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { ROUTE_PATHS, TOAST_MESSAGE_TYPES } from "../../../../constants";
import CartService from "../../../../services/CartService";
import { useDispatch } from "react-redux";
import { updateUserCart } from "../../../../store/AuthSlice";
import { useTranslation } from "react-i18next";
import { postMessageAction } from "../../../../store/ToastMessageSlice";

interface ProductDetailsContainerProps {
  productId: string;
}
const ProductDetailsContainer = (props: ProductDetailsContainerProps) => {
  const { productId } = props;

  const dispatch = useAppDispatch();
  const navigate = useCustomNavigate();

  const { t } = useTranslation();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userCart = useAppSelector((state) => state.auth.userCart);

  const [productDetails, setProductDetails] = useState<Product>();
  const [productInCart, setProductInCart] = useState({
    isProductExistsInCart: false,
    currentQuantity: 0,
  });

  /* Error while fetching product details */
  const [isProductDetailsError, setIsProductDetailsError] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    if (productId) {
      setIsProductDetailsError(false);

      const response = await ProductService.getProduct(productId);

      if (response instanceof ApiError) {
        // Error
        setIsProductDetailsError(true);
      } else {
        setIsProductDetailsError(false);
        setProductDetails(response);
      }
    }
  }, [productId]);

  const addToCart = async (product: Product, quantity: number) => {
    if (!isLoggedIn) {
      navigate(ROUTE_PATHS.login);
    }
    const response = await CartService.addOrUpdateItemInCart(
      product._id,
      quantity
    );

    if (!(response instanceof ApiError)) {
      dispatch(updateUserCart(response));
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.success,
          message: t("cartUpdatedSuccessfully"),
        })
      );
    } else {
      // Error
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.error,
          message: response.errorResponse?.message || response.errorMessage,
        })
      );
    }
  };

  const removeFromCart = async (product: Product) => {
    if (!isLoggedIn) {
      navigate(ROUTE_PATHS.login);
    }

    const response = await CartService.removeItemFromCart(product._id);
    if (!(response instanceof ApiError)) {
      dispatch(updateUserCart(response));
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.success,
          message: t("cartUpdatedSuccessfully"),
        })
      );
    } else {
      // Error
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.error,
          message: response.errorResponse?.message || response.errorMessage,
        })
      );
    }
  };

  const checkProductInCart = useCallback(() => {
    const product = userCart?.items.find(
      (item) => item.product._id === productId
    );
    if (product) {
      setProductInCart({
        isProductExistsInCart: true,
        currentQuantity: product.quantity,
      });
    } else {
      setProductInCart({ isProductExistsInCart: false, currentQuantity: 0 });
    }
  }, [userCart, productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    checkProductInCart();
  }, [checkProductInCart]);

  return (
    <ProductDetails
      product={productDetails}
      isError={isProductDetailsError}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      removeFromCartButtonShown={productInCart.isProductExistsInCart}
      updateQuantityButtonShown={productInCart.isProductExistsInCart}
      quantityInCart={productInCart.currentQuantity}
    />
  );
};

export default ProductDetailsContainer;
