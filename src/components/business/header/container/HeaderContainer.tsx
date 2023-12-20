import React, { ForwardedRef } from "react";
import Header from "../presentation/Header";

const HeaderContainer = React.forwardRef(
  function HeaderContainer(_, ref: ForwardedRef<HTMLDivElement>){
      return <Header ref={ref} />;
  }

)
export default HeaderContainer;
