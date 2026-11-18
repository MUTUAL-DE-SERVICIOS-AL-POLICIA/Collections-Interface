export interface ResponseData {
  error: boolean;
  message: string;
  code?: string;
  [key: string]: any;
}

export interface User {
  name: string;
  username: string;
  email?: string;
  groups: readonly string[];
  clientRoles: readonly string[];
}

export interface ResourcePermission {
  readonly resource: string;
  readonly scopes: readonly string[];
}

export interface UserContext {
  readonly authenticated: true;
  readonly currentTool: string;
  readonly currentClient: string;
  readonly identity: {
    readonly sub: string;
    readonly preferredUsername?: string;
    readonly name?: string;
    readonly givenName?: string;
    readonly familyName?: string;
    readonly email?: string;
  };
  readonly realmRoles: readonly string[];
  readonly clientRoles: readonly string[];
  readonly groups: readonly string[];
  readonly permissions: readonly ResourcePermission[];
  readonly contextExpiresAt: number;
  readonly permissionsExpiresAt: number;
  readonly sessionExpiresAt: number;
  readonly sessionAbsoluteExpiresAt: number;
}
