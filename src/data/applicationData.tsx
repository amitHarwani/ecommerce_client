import { CategoryIcon, NavigationOption } from "../constants";

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
