import { useMemo } from "react";
import InfoHeader from "../presentation/InfoHeader";
import {
  LANGUAGE_DISPLAY_NAMES,
  LanguageDropdownItem,
  SUPPORTED_LANGUAGES,
} from "../../../../constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../../../store/LanguageSlice";

const InfoHeaderContainer = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const infoText = t("infoHeaderMessage");
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

      if (languageId === i18n.language) {
        defaultSelection.id = languageId;
        defaultSelection.text = LANGUAGE_DISPLAY_NAMES[languageHeading];
      }
    }

    return {
      languageList: result,
      defaultSelection,
    };
  }, [i18n.language]);

  const languageChangeHandler = (selectedLanguage: LanguageDropdownItem) => {
    i18n.changeLanguage(selectedLanguage.id);
    dispatch(changeLanguage(selectedLanguage.id));
  };

  const onLinkClickHandler = () => {};

  return (
    <InfoHeader
      languageConfig={languageConfig}
      infoText={infoText}
      linkText={linkText}
      onLinkClickHandler={onLinkClickHandler}
      languageChangeHandler={languageChangeHandler}
    />
  );
};

export default InfoHeaderContainer;
