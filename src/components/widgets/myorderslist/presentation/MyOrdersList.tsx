import { useTranslation } from "react-i18next";
import { OrderClass } from "../../../../services/order/OrderTypes";
import OrdersList from "../../../business/OrdersList";
import ErrorMessage from "../../../basic/ErrorMessage";

interface MyOrdersListProps {
  ordersList: Array<OrderClass>;
  isError: boolean;
}
const MyOrdersList = (props: MyOrdersListProps) => {
  const { ordersList, isError = false } = props;

  const { t } = useTranslation();
  return (
    <>
      {isError ? (
        <ErrorMessage
          message={t("failedToFetchInformation")}
          className="justify-center"
        />
      ) : (
        <OrdersList ordersList={ordersList} />
      )}
    </>
  );
};

export default MyOrdersList;
