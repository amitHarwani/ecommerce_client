import { DropdownItem, DropdownTypes } from "../../constants";
import Dropdown from "../basic/Dropdown";
import Link from "../basic/Link";

interface InfoHeaderProps {
  infoText?: string;
  linkText?: string;
  onLinkClickHandler(): void;
  languageList: Array<DropdownItem>;
  defaultSelectedLanguage: DropdownItem;
  languageChangeHandler(selectedLanguage: DropdownItem): void;
}
const InfoHeader = (props: InfoHeaderProps) => {
  const {
    infoText,
    linkText,
    onLinkClickHandler,
    languageList,
    defaultSelectedLanguage,
    languageChangeHandler,
  } = props;

  return (
    <div className="bg-black py-3 flex justify-center items-center relative">
      <div className="ml-auto text-center">
        {infoText && <span className="text-zinc-50 text-sm">{infoText}</span>}
        {linkText && (
          <Link
            text={linkText}
            onClick={onLinkClickHandler}
            className="text-zinc-50 font-semibold text-sm underline ml-1"
          />
        )}
      </div>
      <div className="ml-auto mr-5">
        <Dropdown
          itemsList={languageList}
          onChange={languageChangeHandler}
          defaultSelectedItem={defaultSelectedLanguage}
          type={DropdownTypes.noBorderDarkBg}
        />
      </div>
    </div>
  );
};

export default InfoHeader;
