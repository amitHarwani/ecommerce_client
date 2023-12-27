import ApiError from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { LoginResp, User } from "./auth/AuthTypes";

class AuthService {
  USER_BASE_URL = "/api/v1/users/";

  async loginService(
    email: string,
    password: string
  ): Promise<LoginResp | ApiError> {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/login`);

    const response = await apiRequest.postRequest<LoginResp>({
      email,
      password,
    });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getCurrentUser(): Promise<User | ApiError>{
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/current-user`);

    const response = await apiRequest.getRequest<User>();

    if(response instanceof ApiResponse && response.success){
      return response.data;
    }
    else if(response instanceof ApiResponse){
      return new ApiError(response.message);
    }
    else{
      return response;
    }
  }

  async logoutService(): Promise<boolean | ApiError>{
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/logout`);

    const response = await apiRequest.postRequest<object>({});

    if(response instanceof ApiResponse && response.success){
      return true;
    }
    else if(response instanceof ApiResponse){
      return new ApiError(response.message);
    }
    else{
      return response
    }
  }
}

export default new AuthService();
