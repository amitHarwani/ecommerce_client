import { useCallback, useEffect, useState } from "react";
import ProfileService from "../../../../services/profile/ProfileService";
import { OrderClass } from "../../../../services/order/OrderTypes";
import ApiError from "../../../../services/ApiError";
import MyOrdersList from "../presentation/MyOrdersList";

const MyOrdersListContainer = () => {
  const [ordersList, setOrdersList] = useState<Array<OrderClass>>([]);

  const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);

  const fetchMyOrders = useCallback(async () => {
    setErrorFetchingOrders(false);
    ProfileService.getUsersOrdersAsync(
      (orders: Array<OrderClass>, _: boolean, error?: ApiError) => {
        if (!error) {
            setOrdersList((prev) => [...prev, ...orders]);
        } else {
          console.error(
            "Error -- myorderslistcontainer, fetchMyOrders()",
            error
          );
          setErrorFetchingOrders(true);
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <>
      <MyOrdersList ordersList={ordersList} isError={errorFetchingOrders} />
    </>
  );
};

export default MyOrdersListContainer;
