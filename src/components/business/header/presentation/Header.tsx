import { useTranslation } from "react-i18next";
import { BREAKPOINTS } from "../../../../constants";
import { DRAWER_ITEMS } from "../../../../data/applicationData";
import useBreakpointCheck from "../../../../hooks/useBreakpointCheck";
import Hamburger from "../../../basic/Hamburger";
import SearchInput from "../../../basic/SearchInput";
import Button from "../../../basic/Button";
import CartIcon from "../../../icons/CartIcon";
import { useAppSelector } from "../../../../store";
import NavList from "../../../basic/NavList";
import InfoHeaderContainer from "../../infoheader/container/InfoHeaderContainer";

const Header = () => {
  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);
  const isLG = useBreakpointCheck(BREAKPOINTS.lg);

  /* Mobile & Tablet */
  if (!isLG) {
    return (
      <div>
        <InfoHeaderContainer />
        <div
          className={`flex items-center justify-between px-2 pb-4 mt-4 border-b-2 border-b-neutral-100 ${
            isRTL ? "flex-row-reverse" : ''
          }`}
        >
          <Hamburger
            headingText={t("companyName")}
            navList={isLG ? [] : DRAWER_ITEMS}
          />
          <SearchInput placeholder={t('searchProductsPlaceholder')} className="flex-1 mx-8"  />
          <Button onClickHandler={() => {}}>
            <CartIcon className="w-8 h-8 text-black" />
          </Button>
        </div>
      </div>
    );
  }

  /* Desktop */
  return (
    <div>
      <InfoHeaderContainer />
      <div className={`flex justify-between items-center mt-4 px-10 pb-4 border-b-2 border-b-neutral-100 ${isRTL ? 'flex-row-reverse': ''}`}>
        <span className={`font-bold capitalize text-2xl tracking-wider text-black`}>
          {t("companyName")}
        </span>

        <NavList navList={DRAWER_ITEMS} className="w-1/3" />    

        <div className={`flex w-2/6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <SearchInput placeholder={t('searchProductsPlaceholder')} className={`w-full ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <Button onClickHandler={() => {}}>
            <CartIcon className="w-8 h-8 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
