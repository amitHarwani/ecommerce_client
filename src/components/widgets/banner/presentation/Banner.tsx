import { useAppSelector } from "../../../../store";
import Timer from "../../../business/Timer";

interface BannerProps {
  isTimerShown: boolean;
  startTime?: string;
  endTime?: string;
  bannerText: string;
}
const Banner = (props: BannerProps) => {
  const { bannerText, isTimerShown, startTime, endTime } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <div
      className=" flex flex-col rounded-3xl h-56 lg:h-72
    bg-[url('/images/bannerimage.png')] bg-cover bg-right bg-no-repeat
    "
      dir={isRTL ? "rtl" : "ltr"}
    >
      <span className="text-zinc-50 text-2xl font-poppinsMedium m-6 w-fit tracking-wider backdrop-blur-md">
        {bannerText}
      </span>
      {isTimerShown && startTime && endTime && (
        <Timer
          startTime={startTime}
          endTime={endTime}
          className="w-full mt-4 justify-center"
          timerContainerClassName="mr-4"
        />
      )}
    </div>
  );
};

export default Banner;
