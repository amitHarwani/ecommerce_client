import { CouponClass } from "../../services/coupon/CouponTypes";
import CouponCard from "./CouponCard";

interface CouponCardListProps {
  coupons: Array<CouponClass>;
  className?: string;
  childContainerClassName?: string;
}
const CouponCardList = (props: CouponCardListProps) => {
  const { coupons, className = "", childContainerClassName = "" } = props;
  return (
    <div className={`${className}`}>
      {coupons.map((coupon) => (
          <CouponCard coupon={coupon} key={coupon._id} className={childContainerClassName} />
      ))}
    </div>
  );
};

export default CouponCardList;
