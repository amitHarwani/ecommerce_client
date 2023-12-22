import { AxiosError, AxiosResponse } from "axios";
import ApiError from "../services/ApiError";
import ApiResponse from "../services/ApiResponse";

export const asyncHandler = async <T>(
  func: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T> | ApiError> => {
  return Promise.resolve(func())
    .then((data) => {
      const responseData = data.data;

      return new ApiResponse<T>(
        responseData.statusCode,
        responseData.data,
        responseData.message,
        responseData.success
      );
    })
    .catch((error: AxiosError) => {
      return new ApiError(error.message, error);
    });
};
