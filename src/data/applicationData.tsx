import AccountIcon from "../components/icons/AccountIcon";
import GuranteeIcon from "../components/icons/GuranteeIcon";
import HeadphoneIcon from "../components/icons/HeadphoneIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import TruckIcon from "../components/icons/TruckIcon";
import MyAccountOptionContainer from "../components/widgets/myaccountoption/container/MyAccountOptionContainer";
import {
  COMPANY_GURANTEE,
  CategoryIcon,
  DropdownItem,
  NavigationOption,
  SelectionMenuItem,
} from "../constants";

export const DRAWER_ITEMS: Array<NavigationOption> = [
  {
    id: 1,
    textKey: "home",
    navigateTo: "/",
  },
  {
    id: 2,
    textKey: "about",
    navigateTo: "/about",
  },
  {
    id: 3,
    textKey: "contact",
    navigateTo: "/contact",
  },
  {
    id: 4,
    textKey: "login",
    navigateTo: "/login",
  },
];

export const getNavigationItemList = (isLoggedIn: boolean) => {
  const tempDrawerItems = [...DRAWER_ITEMS];
  if (isLoggedIn) {
    tempDrawerItems.pop();
    tempDrawerItems.push({
      id: 4,
      textKey: "myAccount",
      navigateTo: "my-account",
      customComponent: <MyAccountOptionContainer />
    });
  }
  return tempDrawerItems;
};


export const MY_ACCOUNT_OPTIONS: Array<SelectionMenuItem> = [
  {
    id: 1,
    textKey: "manageAccount",
    icon: <AccountIcon className=""/>,
  },
  {
    id: 2,
    textKey: "logout",
    icon: <LogoutIcon className="" />,
  },
];

export const BANNER_PROMOTION_END_DATE = "2024-01-31T00:00:00";

export const CATEGORY_ICONS: CategoryIcon = {};

export const DEFAULT_CURRENCY = "AED";

export const DEFAULT_COUNTRY = "United Arab Emirates";

export const COUNTRIES_DROPDOWN_LIST: DropdownItem[] = [{id: 1, text: DEFAULT_COUNTRY}]
export const COMPANY_GURANTEE_LIST: COMPANY_GURANTEE[] = [
  {
    id: 1,
    icon: <TruckIcon className="w-10 h-10 text-white" />,
    headingKey: "freeAndFastDelivery",
    descriptionKey: "freeDeliveryFor",
  },
  {
    id: 2,
    icon: <HeadphoneIcon className="w-10 h-10 text-white" />,
    headingKey: "247customerService",
    descriptionKey: "247customerServiceDescription",
  },
  {
    id: 3,
    icon: <GuranteeIcon className="w-10 h-10 text-white" />,
    headingKey: "guranteeHeading",
    descriptionKey: "guranteeDescription",
  },
];

export const EXPLORE_PRODUCTS_COUNT = 8;
export const FEATURED_PRODUCTS_COUNT = 4;
export const RELATED_PRODUCTS_COUNT = 4;
