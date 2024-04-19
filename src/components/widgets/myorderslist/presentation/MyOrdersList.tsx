import { useTranslation } from "react-i18next";
import { OrderClass } from "../../../../services/order/OrderTypes";
import OrdersList from "../../../business/OrdersList";
import ErrorMessage from "../../../basic/ErrorMessage";

interface MyOrdersListProps {
  ordersList: Array<OrderClass>;
  orderClickHandler(order: OrderClass): void;
  isError: boolean;
}
const MyOrdersList = (props: MyOrdersListProps) => {
  const { ordersList, isError = false, orderClickHandler } = props;

  const { t } = useTranslation();
  return (
    <>
      {isError ? (
        <ErrorMessage
          message={t("failedToFetchInformation")}
          className="justify-center"
        />
      ) : (
        <OrdersList ordersList={ordersList} orderClickHandler={orderClickHandler} />
      )}
    </>
  );
};

export default MyOrdersList;
