import { SelectionMenuItem } from "../../../../constants";
import MyAccountOption from "../presentation/MyAccountOption";
import { useState } from "react";
import LogoutModalContainer from "../../../modals/logoutmodal/container/LogoutModalContainer";

const MyAccountOptionContainer = () => {

  const [isLogoutModalShown, setIsLogoutModalShown] = useState(false);

  const itemClickHandler = (item: SelectionMenuItem) => {
    switch (item.id) {
      case 1:
        return;
      case 2: {
        //Logout
        setIsLogoutModalShown(true);
        return;
      }
    }
  };

  const hideLogoutModal = () => {
    setIsLogoutModalShown(false);
  };

  return (
    <>
      <MyAccountOption itemClickHandler={itemClickHandler} />
      {
        isLogoutModalShown &&
        <LogoutModalContainer isShown={isLogoutModalShown} hideModal={hideLogoutModal} />
      }
    </>
  );
};

export default MyAccountOptionContainer;
