import { useState } from "react";
import { LoginFormFields, ROUTE_PATHS } from "../../../../constants";
import Login from "../presentation/Login";
import AuthService from "../../../../services/auth/AuthService";
import ApiError from "../../../../services/ApiError";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../store/AuthSlice";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

const LoginContainer = () => {

  const navigate = useCustomNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  /* Login in progress flag */
  const [isLoading, setIsLoading] = useState(false);

  /* API Error message state */
  const [errorMessage, setErrorMessage] = useState("");

  const loginClickHandler = async (inputData: LoginFormFields) => {
    setIsLoading(true);
    setErrorMessage("");

    const response = await AuthService.loginService(
      inputData.email,
      inputData.password
    );

    setIsLoading(false);

    if (response instanceof ApiError) {
      setErrorMessage(response.errorResponse?.message || response.errorMessage);
    } else {
      // Logged In
      dispatch(logIn(response.user));
      const previousRoute = location.state?.previousRoute;

      if(previousRoute){
        navigate(previousRoute, true);
      }
      else{
        navigate("/")
      }
    }
  };

  /* Redirection to Backend URL for google login  */
  const googleLoginClickHandler = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URI}${AuthService.GOOGLE_LOGIN_REDIRECT_URL}`;
  }

  /* navigating to /signup */
  const signupClickHandler = () => {
    navigate(ROUTE_PATHS.signup)
  };

  const forgotPasswordClickHandler = () => {};
  return (
    <Login
      loginClickHandler={loginClickHandler}
      googleLoginClickHandler={googleLoginClickHandler}
      signupClickHandler={signupClickHandler}
      forgotPasswordClickHandler={forgotPasswordClickHandler}
      isLoading={isLoading}
      apiError={errorMessage}
    />
  );
};

export default LoginContainer;
