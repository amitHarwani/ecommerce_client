import { NavigationOption } from "../../constants";
import NavItem from "./NavItem";


interface NavListProps {
    navList: Array<NavigationOption>
    className?: string
}

const NavList = (props: NavListProps) => {

    const {navList, className = ''} = props;

    return (
        <div className={`flex flex-col lg:flex-row lg:justify-between lg:items-center ${className} `}>
            {
                navList.map((navItem) => (
                    <NavItem navItem={navItem} key={navItem.id} />
                ))
            }
        </div>
    )
}

export default NavList;