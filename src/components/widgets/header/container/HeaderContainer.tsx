import React, { ForwardedRef } from "react";
import Header from "../presentation/Header";
import { useNavigate } from "react-router-dom";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate("/");
  };

  return <Header ref={ref} logoClickHandler={logoClickHandler} />;
});
export default HeaderContainer;
