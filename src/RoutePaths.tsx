import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import HomePageContainer from "./pages/home/container/HomePageContainer";
import ProductsPageContainer from "./pages/products/container/ProductsPageContainer";
import { ROUTE_PATHS } from "./constants";
import ProductDetailPageContainer from "./pages/productdetail/container/ProductDetailPageContainer";
import LoginPageContainer from "./pages/login/container/LoginPageContainer";
import SignupPageContainer from "./pages/signup/container/SignupPageContainer";
import CartPageContainer from "./pages/cart/container/CartPageContainer";
import ForLoggedInUsers from "./protectedroutes/ForLoggedInUsers";

/* All Routes */
const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePageContainer />} />
          <Route path={ROUTE_PATHS.products} element={<ProductsPageContainer />} />
          <Route path={ROUTE_PATHS.product} element={<ProductDetailPageContainer />} />
          <Route path={ROUTE_PATHS.login} element={<LoginPageContainer />} />
          <Route path={ROUTE_PATHS.signup} element={<SignupPageContainer />} />
          <Route element={<ForLoggedInUsers />}>
            <Route path={ROUTE_PATHS.cart} element={<CartPageContainer />} />
          </Route>
          <Route path="contact" element={<h1 className="flex justify-center items-center text-2xl">Contact</h1>} />
          <Route path="about" element={<h1 className="flex justify-center items-center text-2xl">About</h1>} />
          <Route path="register" element={<h1 className="flex justify-center items-center text-2xl">Register</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
