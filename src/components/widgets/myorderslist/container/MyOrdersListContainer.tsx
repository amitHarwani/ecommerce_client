import { useCallback, useEffect, useState } from "react";
import ProfileService from "../../../../services/profile/ProfileService";
import { OrderClass } from "../../../../services/order/OrderTypes";
import ApiError from "../../../../services/ApiError";
import MyOrdersList from "../presentation/MyOrdersList";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { QUERY_PARAMS, ROUTE_PATHS } from "../../../../constants";
import { createSearchParams } from "react-router-dom";

const MyOrdersListContainer = () => {
  const navigate = useCustomNavigate();

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

  /* Navigate to /order?orderId=<orderId> on click of an order */
  const orderClickHandler = (order: OrderClass) => {
    navigate({
      pathname: ROUTE_PATHS.orderDetail,
      search: createSearchParams({
        [QUERY_PARAMS.orderId]: order._id,
      }).toString(),
    });
  };

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <>
      <MyOrdersList
        ordersList={ordersList}
        isError={errorFetchingOrders}
        orderClickHandler={orderClickHandler}
      />
    </>
  );
};

export default MyOrdersListContainer;
