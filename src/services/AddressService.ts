import ApiError from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { AddressClass } from "./address/AddressTypes";

class AddressService {
  BASE_URL = "/api/v1/ecommerce/addresses";

  async createAddress(
    country: string,
    state: string,
    city: string,
    addressLine1: string,
    addressLine2: string = "",
    pincode: string = ""
  ): Promise<boolean | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.postRequest<AddressClass>({
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      pincode,
    });

    if (response instanceof ApiResponse && response.success) {
      return true;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new AddressService();
