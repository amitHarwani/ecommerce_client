import { useMemo } from "react";
import InfoHeader from "../presentation/InfoHeader";
import {
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
    const defaultSelection: LanguageDropdownItem = { id: "", textKey: "" };
    let languageHeading: keyof typeof SUPPORTED_LANGUAGES;

    for (languageHeading in SUPPORTED_LANGUAGES) {
      const languageId = SUPPORTED_LANGUAGES[languageHeading];

      result.push({
        id: languageId,
        textKey: languageId,
      });

      if (languageId === i18n.language) {
        defaultSelection.id = languageId;
        defaultSelection.textKey = languageId;
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
