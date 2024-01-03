import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import useCustomNavigate from "../hooks/useCustomNavigate";
import { ROUTE_PATHS } from "../constants";
import { useEffect } from "react";

const ForLoggedInUsers = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useAppSelector(
    (state) => state.auth.isLogInCheckDone
  );

  const navigate = useCustomNavigate();

  console.log("For Logged In Users", isLoggedIn, isLoginCheckDone);

  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(ROUTE_PATHS.login);
    }
  }, [isLoginCheckDone, isLoggedIn, navigate]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }
  return <></>;
};

export default ForLoggedInUsers;
