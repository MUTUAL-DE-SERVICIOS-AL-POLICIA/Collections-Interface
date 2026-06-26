export interface ResponseData {
  error: boolean;
  message: string;
  [key: string]: any;
}
export interface User {
  id: string;
  name: string;
  username: string;
  identityCard?: string;
  position?: string;
}
