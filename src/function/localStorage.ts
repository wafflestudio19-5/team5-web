const tokenKey = "auth_token" as const;

export const saveToken = (input: string) => {
  window.localStorage.setItem(tokenKey, input);
};

export const loadToken = () => {
  const token = window.localStorage.getItem(tokenKey);
  if (token && token !== "") {
    return token;
  } else {
    return null;
  }
};

export const deleteToken = () => {
  window.localStorage.setItem(tokenKey, "");
};
