export abstract class APIConnection {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected buildUrl(endpoint: string): string {
    return `${this.baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
  }

  abstract GET(url: string, options?: any): Promise<any>;
  abstract POST(url: string, body: any, options?: any): Promise<any>;
  abstract PUT(url: string, body: any, options?: any): Promise<any>;
  abstract DELETE(url: string, options?: any): Promise<any>;

  protected addInterceptors(requestConfig: RequestInit): RequestInit {
    const interceptors = {
      headers: {
        "Content-Type": "application/json",
      },
      body: requestConfig.body,
    };

    return {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        ...interceptors.headers,
      },
      body: interceptors.body,
    };
  }

  protected async handleRequest(
    endpoint: string,
    requestConfig: RequestInit,
  ): Promise<any> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, requestConfig);
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      if (contentType.includes("application/json")) {
        return response;
      }
      const errorData = await response.json();

      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`,
      );
    }

    return response;
  }
}
