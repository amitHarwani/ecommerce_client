import { useMemo } from "react";
import { OrderClass } from "../../services/order/OrderTypes";
import { formatDateTime } from "../../utils/dateTimeHelper";
import { DATE_TIME_FORMATS } from "../../constants";
import { formatAmount } from "../../utils/commonHelper";
import { DEFAULT_CURRENCY } from "../../data/applicationData";
import { useAppSelector } from "../../store";

interface OrderCardProps {
  order: OrderClass;
  className?: string;
}
const OrderCard = (props: OrderCardProps) => {
  const { order, className = "" } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const displayedOrderDate = useMemo(() => {
    return formatDateTime(
      order.createdAt,
      DATE_TIME_FORMATS.standardDateWithTime,
      DATE_TIME_FORMATS.displayedDateWithTime
    );
  }, [order]);

  const displayedOrderAddress = useMemo(() => {
    return `${order.address.addressLine1} ${order.address.addressLine2}, ${order.address.state}, ${order.address.country}`;
  }, [order]);

  return (
    <div
      className={`flex flex-col p-4 rounded-md border border-grey shadow gap-y-4 ${className}`}
      dir={isRTL ? 'rtl': 'ltr'}
    >
      <div
        className={`flex justify-between items-center`}
      >
        <span className="text-sm">{displayedOrderDate}</span>
        <span className="font-bold">{order.status}</span>
      </div>
      <span className="overflow-hidden text-ellipsis line-clamp-2">{displayedOrderAddress}</span>
      <span className={`text-darkRed font-semibold self-end`}>
        {formatAmount(order.discountedOrderPrice, DEFAULT_CURRENCY)}
      </span>
    </div>
  );
};

export default OrderCard;
