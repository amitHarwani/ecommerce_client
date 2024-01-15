import axios, { AxiosError } from "axios";
import ApiError, { ApiErrorResponse } from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { GeneratePayPalOrderResponseClass } from "./order/OrderTypes";

class OrderService {
  BASE_URL = "/api/v1/ecommerce/orders/provider";

  async generatePayPalOrder(
    addressId: string
  ): Promise<GeneratePayPalOrderResponseClass | ApiError> {
    const apiRequest = new ApiRequest(`${this.BASE_URL}/paypal`);

    const response =
      await apiRequest.postRequest<GeneratePayPalOrderResponseClass>({
        addressId,
      });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    }
    return response;
  }

  async verifyPayment(orderId: string): Promise<boolean | ApiError> {
    try {
      await axios.post(`${this.BASE_URL}/paypal/verify-payment`, { orderId });

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        return new ApiError(error.message, error, error.response?.data);
      }
      return new ApiError("");
    }
  }
}

export default new OrderService();
