import { NavLink } from "react-router-dom";
import { NavigationOption } from "../../constants";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";

interface NavItemProps {
  navItem: NavigationOption;
  className?: string
}

const NavItem = (props: NavItemProps) => {
  const { navItem, className = '' } = props;

  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <>
      <div className={`mb-4 lg:mb-0 lg:relative lg:w-fit ${className}`}>
        <NavLink
          className={(
            {isActive}
          ) => `w-full lg:w-auto flex text-zinc-50 lg:text-black
          lg:before:absolute lg:before:content-[''] lg:before:-bottom-px lg:before:w-0 lg:before:h-px lg:before:bg-zinc-400 lg:before:transition-all
          lg:before:hover:w-full
          ${isRTL ? "flex-row-reverse" : ""}  
          ${
            isActive ?
            "lg:hover:before:w-0 font-bold lg:font-normal lg:underline lg:underline-offset-[7.4px] lg:decoration-1"
            : ''
          }
        `}
          to={navItem?.navigateTo}
        >
          {navItem?.icon}

          <span className="capitalize">{t(navItem.textKey)}</span>
        </NavLink>
      </div>
    </>
  );
};

export default NavItem;
