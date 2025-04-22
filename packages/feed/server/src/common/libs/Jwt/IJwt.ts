export interface JwtPayload {
  id: string;
}

export interface IJwt {
  decrypt: (cipherText: string) => JwtPayload;
  encrypt: (payload: JwtPayload, timeToExpire?: string) => string;
  isValidFormat: (token: string) => boolean;
}
