import axios, { AxiosResponse } from "axios";
import { asyncHandler } from "../utils/asyncHandler";
import { LOCAL_STORAGE_KEYS } from "../constants";
import ApiResponse from "./ApiResponse";
import ApiError from "./ApiError";

class ApiRequest {
  constructor(public url: string) {}

  private getAccessTokenHeader(): object {
    return {
      Authorization: `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_KEYS.accessToken
      )}`,
    };
  }

  async getRequest<T>(
    queryParams: object = {},
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<ApiResponse<T> | ApiError> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler<T>(
      (): Promise<AxiosResponse<ApiResponse<T>>> =>
        axios.get<ApiResponse<T>>(this.url, {
          params: queryParams,
          headers: headers,
        })
    );
  }

  async postRequest<T>(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<ApiResponse<T> | ApiError> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler<T>(
      (): Promise<AxiosResponse<ApiResponse<T>>> =>
        axios.post<ApiResponse<T>>(this.url, body, { headers: headers })
    );
  }

  async putRequest<T>(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<ApiResponse<T> | ApiError> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(
      (): Promise<AxiosResponse<ApiResponse<T>>> =>
        axios.put<ApiResponse<T>>(this.url, body, { headers: headers })
    );
  }

  async deleteRequest<T>(
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<ApiResponse<T> | ApiError> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(
      (): Promise<AxiosResponse<ApiResponse<T>>> =>
        axios.delete<ApiResponse<T>>(this.url, { headers: headers })
    );
  }

  async patchRequest<T>(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<ApiResponse<T> | ApiError> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(
      (): Promise<AxiosResponse<ApiResponse<T>>> =>
        axios.patch<ApiResponse<T>>(this.url, body, { headers: headers })
    );
  }
}

export default ApiRequest;
