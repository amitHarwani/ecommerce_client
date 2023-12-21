import { useTranslation } from "react-i18next";
import Banner from "../presentation/Banner";
import { useEffect, useState } from "react";
import { getCurrentUTCTime } from "../../../../utils/dateTimeHelper";
import { DATE_TIME_FORMATS } from "../../../../constants";
import { BANNER_PROMOTION_END_DATE } from "../../../../data/applicationData";

const BannerContainer = () => {
  const { t } = useTranslation();

  const [startTime, setStartTime] = useState(
    getCurrentUTCTime(DATE_TIME_FORMATS.standardDateWithTime)
  );

  useEffect(() => {
    setInterval(() => {
      setStartTime(getCurrentUTCTime(DATE_TIME_FORMATS.standardDateWithTime));
    }, 1000);
  }, []);

  return (
    <Banner
      bannerText={t("bannerPromotion")}
      isTimerShown={true}
      startTime={startTime}
      endTime={BANNER_PROMOTION_END_DATE}
    />
  );
};

export default BannerContainer;
