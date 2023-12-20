import { NavigationOption } from "../constants";

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