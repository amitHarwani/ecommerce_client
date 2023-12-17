import { useMemo } from "react";
import {
  DEFAULT_LANGUAGE,
  DropdownItem,
  DropdownTypes,
  LANGUAGE_DISPLAY_NAMES,
  SUPPORTED_LANGUAGES,
} from "../../constants";
import Dropdown from "../basic/Dropdown";
import Link from "../basic/Link";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../store/LanguageSlice";
import { useAppSelector } from "../../store";

interface LanguageDropdownItem extends DropdownItem {
  id: string;
  text: string;
}

interface InfoHeaderProps {}

const InfoHeader = (props: InfoHeaderProps) => {
  const { t, i18n } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);
  const dispatch = useDispatch();

  const infoText = t("newItemsMessage");
  const linkText = "";

  const languageConfig = useMemo(() => {
    const result: Array<LanguageDropdownItem> = [];
    const defaultSelection: LanguageDropdownItem = { id: "", text: "" };
    let languageHeading: keyof typeof SUPPORTED_LANGUAGES;

    for (languageHeading in SUPPORTED_LANGUAGES) {
      const languageId = SUPPORTED_LANGUAGES[languageHeading];

      result.push({
        id: languageId,
        text: LANGUAGE_DISPLAY_NAMES[languageHeading],
      });

      if (languageId === DEFAULT_LANGUAGE) {
        defaultSelection.id = languageId;
        defaultSelection.text = LANGUAGE_DISPLAY_NAMES[languageHeading];
      }
    }

    return {
      languageList: result,
      defaultSelection,
    };
  }, []);

  const languageChangeHandler = (selectedLanguage: LanguageDropdownItem) => {
    i18n.changeLanguage(selectedLanguage.id);
    dispatch(changeLanguage(selectedLanguage.id));
  };

  const onLinkClickHandler = () => {};

  return (
    <div className={`bg-black py-3 flex justify-center items-center relative ${isRTL && 'flex-row-reverse'}`}>
      <div className={`text-center ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
        {infoText && <span className="text-zinc-50 text-sm">{infoText}</span>}
        {linkText && (
          <Link
            text={linkText}
            onClick={onLinkClickHandler}
            className="text-zinc-50 font-semibold text-sm underline ml-1"
          />
        )}
      </div>
      <div className={`${isRTL ? 'mr-auto ml-5' : 'ml-auto mr-5'}`}>
        <Dropdown
          itemsList={languageConfig.languageList}
          onChange={languageChangeHandler}
          defaultSelectedItem={languageConfig.defaultSelection}
          type={DropdownTypes.noBorderDarkBg}
        />
      </div>
    </div>
  );
};

export default InfoHeader;
