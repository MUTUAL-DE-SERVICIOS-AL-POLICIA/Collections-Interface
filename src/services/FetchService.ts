import { APIConnection } from "./APIConnection";

export class FetchService extends APIConnection {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async GET(endpoint: string, params?: Record<string, string>): Promise<any> {
    let url = endpoint;

    if (params) {
      const queryParams = new URLSearchParams(params).toString();

      url += `?${queryParams}`;
    }
    const requestConfig = this.addInterceptors({
      method: "GET",
    });

    return this.handleRequest(url, requestConfig);
  }

  async POST(endpoint: string, body: any): Promise<any> {
    const requestConfig = this.addInterceptors({
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleRequest(endpoint, requestConfig);
  }

  async PUT(endpoint: string, body: any): Promise<any> {
    const requestConfig = this.addInterceptors({
      method: "PUT",
      body: JSON.stringify(body),
    });

    return this.handleRequest(endpoint, requestConfig);
  }
  async DELETE(endpoint: string): Promise<any> {
    const requestConfig = this.addInterceptors({
      method: "DELETE",
    });

    return this.handleRequest(endpoint, requestConfig);
  }
}
