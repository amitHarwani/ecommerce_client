import { NavigationOption } from "../../constants";
import { useAppSelector } from "../../store";
import NavItem from "./NavItem";

interface NavListProps {
  navList: Array<NavigationOption>;
  className?: string;
}

const NavList = (props: NavListProps) => {
  const { navList, className = "" } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <div
      className={`flex flex-col lg:flex-row lg:justify-between lg:items-center 
        ${isRTL ? "lg:flex-row-reverse" : ""} 
        ${className} `}
    >
      {navList.map((navItem) =>
        navItem?.customComponent ? (
          <div key={navItem.id}>{navItem.customComponent}</div>
        ) : (
          <NavItem navItem={navItem} key={navItem.id} />
        )
      )}
    </div>
  );
};

export default NavList;
