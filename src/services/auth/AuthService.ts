import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";
import { LoginResp, USER_ROLES, User } from "./AuthTypes";

class AuthService {
  USER_BASE_URL = "/api/v1/users";

  /* Login Service */
  async loginService(
    email: string,
    password: string
  ): Promise<LoginResp | ApiError> {
    /* ApiRequest Object */
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/login`);

    /* Post Request: Response Type is LoginResp */
    const response = await apiRequest.postRequest<LoginResp>({
      email,
      password,
    });

    /* In case of success: sending LoginResp Object */
    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      /* 200 With error */
      return new ApiError(response.message);
    } else {
      /* ApiError Object */
      return response;
    }
  }

  async getCurrentUser(): Promise<User | ApiError> {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/current-user`);

    const response = await apiRequest.getRequest<User>();

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async logoutService(): Promise<boolean | ApiError> {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/logout`);

    const response = await apiRequest.postRequest<object>({});

    if (response instanceof ApiResponse && response.success) {
      return true;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async signUp(
    email: string,
    username: string,
    password: string,
    role: USER_ROLES
  ): Promise<User | ApiError> {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/register`);

    const response = await apiRequest.postRequest<User>({
      email,
      username,
      password,
      role,
    });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new AuthService();
