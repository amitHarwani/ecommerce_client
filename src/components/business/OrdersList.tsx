import { OrderClass } from "../../services/order/OrderTypes";
import { useAppSelector } from "../../store";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  ordersList: Array<OrderClass>;
}
const OrdersList = (props: OrdersListProps) => {
  const { ordersList } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {ordersList?.map((order) => (
        <div key={order._id}>
          <OrderCard order={order} className="h-full" />
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
