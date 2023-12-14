import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler";

class ApiRequest {
  constructor(public url: string) {}

  private getAccessTokenHeader(): object {
    return {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }

  async getRequest(
    queryParams: object = {},
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<object> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(() =>
      axios.get(this.url, { params: queryParams, headers: headers })
    );
  }

  async postRequest(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<object> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(() =>
      axios.post(this.url, body, { headers: headers })
    );
  }

  async putRequest(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<object> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(() =>
      axios.put(this.url, body, { headers: headers })
    );
  }

  async deleteRequest(
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<object> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(() =>
      axios.delete(this.url, { headers: headers })
    );
  }

  async patchRequest(
    body: object,
    headers: object = {},
    withAccessToken: boolean = true
  ): Promise<object> {
    headers = withAccessToken
      ? { ...headers, ...this.getAccessTokenHeader() }
      : headers;

    return await asyncHandler(() =>
      axios.patch(this.url, body, { headers: headers })
    );
  }
}

export default ApiRequest;
