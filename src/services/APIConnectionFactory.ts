import { APIConnection } from "./APIConnection";

export abstract class APIConnectionFactory {
  public abstract createAPIConnection(): APIConnection;
}
