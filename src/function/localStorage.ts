import { TokenType } from "../interface/interface";
const tokenKey = "auth_token" as const;

export const saveToken = (input: TokenType) => {
  if (input) {
    window.localStorage.setItem(tokenKey, JSON.stringify(input));
  }
};

export const loadToken = () => {
  const loadedToken = window.localStorage.getItem(tokenKey);
  if (loadedToken) {
    return JSON.parse(loadedToken);
  } else {
    return null;
  }
};

export const deleteToken = () => {
  window.localStorage.removeItem(tokenKey);
};
