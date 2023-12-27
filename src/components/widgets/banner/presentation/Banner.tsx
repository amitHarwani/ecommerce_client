import Timer from "../../../business/Timer";

interface BannerProps {
  isTimerShown: boolean;
  startTime?: string;
  endTime?: string;
  bannerText: string;
}
const Banner = (props: BannerProps) => {
  const { bannerText, isTimerShown, startTime, endTime } = props;
  return (
    <div className="bg-gradient-to-b from-black via-stone-600 to-black flex flex-col items-center rounded-3xl py-16">
      <span className="text-zinc-50 text-2xl lg:text-3xl lg:font-semibold tracking-wider">{bannerText}</span>
      {isTimerShown && startTime && endTime && (
        <Timer startTime={startTime} endTime={endTime} className="w-full mt-4 justify-center" timerContainerClassName="mr-4" />
      )}
    </div>
  );
};

export default Banner;
