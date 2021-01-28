import * as React from "react";
import { useQueryClient } from "react-query";
import { useAsync } from "../utils/hooks";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { clearAuthKeys, getToken, saveToken } from "../utils/auth";
import { loginApi, registerApi, getCurrentuser } from "../utils/api";
import { LoginRequest, RegisterRequest } from "../types/auth";
import { routes } from "../routes";
import { User } from "../types/user";

async function bootstrapAppData() {
  const { token } = getToken();
  if (token) {
    try {
      const user = await getCurrentuser();
      return user;
    } catch (e) {
      return null;
    }
  }
  return null;
}

const AuthContext = React.createContext<{
  user: User;
  login: (
    payload: LoginRequest,
    onSuccess: () => void,
    onError: (error: any) => void
  ) => Promise<void>;
  register: (
    payload: RegisterRequest,
    onSuccess: () => void,
    onError: (error: any) => void
  ) => Promise<void>;
  logout: () => void;
}>({
  user: {} as User,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
});
AuthContext.displayName = "AuthContext";

function AuthProvider(props: Object) {
  const queryClient = useQueryClient();
  const {
    data,
    status,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    (
      payload: LoginRequest,
      onSuccess: () => void,
      onError: (error: any) => void
    ): Promise<void> =>
      loginApi(payload)
        .then((response) => {
          saveToken(response.token);
          setData(response);
          onSuccess();
        })
        .catch(onError),
    [setData]
  );

  const register = React.useCallback(
    (
      payload: RegisterRequest,
      onSuccess: () => void,
      onError: (error: any) => void
    ): Promise<void> =>
      registerApi(payload)
        .then((response) => {
          saveToken(response.token);
          setData(response);
          onSuccess();
        })
        .catch(onError),
    [setData]
  );

  const logout = React.useCallback(() => {
    clearAuthKeys();
    queryClient.clear();
    setData(null);
  }, [queryClient, setData]);

  const value = React.useMemo(
    () => ({ user: data?.user, login, logout, register }),
    [login, logout, register, data]
  );

  if (isLoading || isIdle) {
    return <Loader />;
  }

  if (isError) {
    return <Redirect to={routes.PAGE_ERROR_500} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
