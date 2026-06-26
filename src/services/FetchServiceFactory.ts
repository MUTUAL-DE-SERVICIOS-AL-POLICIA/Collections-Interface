import { APIConnection } from "./APIConnection";
import { APIConnectionFactory } from "./APIConnectionFactory";
import { FetchService } from "./FetchService";

export class FetchServiceFactory extends APIConnectionFactory {
  private baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  public createAPIConnection(): APIConnection {
    return new FetchService(this.baseUrl);
  }
}

const host = process.env.NEXT_PUBLIC_BACKEND_HOST || "localhost";
const port = process.env.NEXT_PUBLIC_BACKEND_PORT || 3000;

const baseUrl = `http://${host}:${port}/api/`;

const factory = new FetchServiceFactory(baseUrl);

export const apiClient = factory.createAPIConnection();

const hostLogin = process.env.NEXT_PUBLIC_SERVER_FRONTEND || "localhost";
const portLogin = process.env.LOGIN_FRONTEND_PORT || 3001;

export const urlLogin = `http://${hostLogin}:${portLogin}`;
