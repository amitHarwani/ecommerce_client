import ApiError from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { UserCart } from "./cart/CartTypes";

class CartService {
  BASE_URL = "/api/v1/ecommerce/cart";

  async getUserCart(): Promise<UserCart | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.getRequest<UserCart>();

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new CartService();
