import GuranteeIcon from "../components/icons/GuranteeIcon";
import HeadphoneIcon from "../components/icons/HeadphoneIcon";
import TruckIcon from "../components/icons/TruckIcon";
import { COMPANY_GURANTEE, CategoryIcon, NavigationOption } from "../constants";

export const DRAWER_ITEMS: Array<NavigationOption> = [
    {
        id: 1,
        textKey: 'home',
        navigateTo: '/'
    },
    {
        id: 2,
        textKey: 'about',
        navigateTo: '/about'
    },
    {
        id: 3,
        textKey: 'contact',
        navigateTo: '/contact'
    },
    {
        id: 4,
        textKey: 'login',
        navigateTo: '/login'
    }
]

export const BANNER_PROMOTION_END_DATE = "2024-01-31T00:00:00";

export const CATEGORY_ICONS: CategoryIcon = {
}

export const DEFAULT_CURRENCY = "AED"

export const COMPANY_GURANTEE_LIST: COMPANY_GURANTEE[] = [
    {
        id: 1,
        icon: <TruckIcon className="w-10 h-10 text-white" />,
        headingKey: "freeAndFastDelivery",
        descriptionKey: "freeDeliveryFor" 
    },
    {
        id: 2,
        icon: <HeadphoneIcon className="w-10 h-10 text-white" />,
        headingKey: "247customerService",
        descriptionKey: "247customerServiceDescription" 
    },
    {
        id: 3,
        icon: <GuranteeIcon className="w-10 h-10 text-white" />,
        headingKey: "guranteeHeading",
        descriptionKey: "guranteeDescription" 
    },
]
