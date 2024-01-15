import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";
import { ProfileClass } from "./ProfileTypes";

class ProfileService {
  BASE_URL = "/api/v1/ecommerce/profile";

  async getUserProfile(): Promise<ProfileClass | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);
    const response = await apiRequest.getRequest<ProfileClass>();

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    }
    return response;
  }

  async updateUserProfile(
    countryCode: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): Promise<ProfileClass | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);
    const response = await apiRequest.patchRequest<ProfileClass>({
      countryCode,
      firstName,
      lastName,
      phoneNumber,
    });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    }
    return response;
  }
}

export default new ProfileService();
