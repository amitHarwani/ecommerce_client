import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductDetails from "../presentation/ProductDetails";
import ProductService from "../../../../services/ProductService";
import ApiError from "../../../../services/ApiError";
import { useAppDispatch, useAppSelector } from "../../../../store";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { ROUTE_PATHS } from "../../../../constants";
import { useTranslation } from "react-i18next";
import { addOrUpdateToCartThunk, removeFromCartThunk } from "../../../../store/CartSlice";
import { CartItem } from "../../../../services/cart/CartTypes";

interface ProductDetailsContainerProps {
  productId: string;
}
const ProductDetailsContainer = (props: ProductDetailsContainerProps) => {
  const { productId } = props;

  const dispatch = useAppDispatch();
  const navigate = useCustomNavigate();


  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userCart = useAppSelector((state) => state.cart.userCart);

  const [productDetails, setProductDetails] = useState<Product>();

  /* If the product is in cart and the quantity in cart */
  const [productInCart, setProductInCart] = useState({
    isProductExistsInCart: false,
    currentQuantity: 0,
  });

  /* Error while fetching product details */
  const [isProductDetailsError, setIsProductDetailsError] = useState(false);

  const isAddOrUpdateCartInProgress = useAppSelector(state => state.cart.isAddOrUpdateToCartInProgress);
  const isRemoverFromCartInProgress = useAppSelector(state => state.cart.isRemoveFromCartInProgress);



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
      return;
    }
    dispatch(addOrUpdateToCartThunk({productId: product._id, quantity}));

  };

  const removeFromCart = async (product: Product) => {
    if (!isLoggedIn) {
      navigate(ROUTE_PATHS.login);
      return;
    }
    dispatch(removeFromCartThunk({productId: product._id})); 

  };

  const checkProductInCart = useCallback(() => {
    const product = userCart?.items.find(
      (item: CartItem) => item.product._id === productId
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
      isAddOrUpdateCartInProgress={isAddOrUpdateCartInProgress}
      isRemoverFromCartInProgress={isRemoverFromCartInProgress}
    />
  );
};

export default ProductDetailsContainer;
