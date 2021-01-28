const tokenStorageKey = "__auth_provider_token__";

export const getToken = () => {
  const token = window.localStorage.getItem(tokenStorageKey);
  return { token };
};

export const clearAuthKeys = () => {
  window.localStorage.removeItem(tokenStorageKey);
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(tokenStorageKey, token);
};
