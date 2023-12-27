import { useState } from "react";
import { LoginFormFields } from "../../../../constants";
import Login from "../presentation/Login";
import AuthService from "../../../../services/AuthService";
import ApiError from "../../../../services/ApiError";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../store/AuthSlice";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

const LoginContainer = () => {

  const navigate = useCustomNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  console.log("Location",location);

  const [isLoading, setIsLoading] = useState(false);
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
      previousRoute ? navigate(previousRoute) : navigate('/');
    }
  };

  const signupClickHandler = () => {};

  const forgotPasswordClickHandler = () => {};
  return (
    <Login
      loginClickHandler={loginClickHandler}
      signupClickHandler={signupClickHandler}
      forgotPasswordClickHandler={forgotPasswordClickHandler}
      isLoading={isLoading}
      apiError={errorMessage}
    />
  );
};

export default LoginContainer;
