import * as React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { routes } from "../routes";

interface AuthGuardType {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardType) {
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect to={routes.SIGNIN} />;
  }

  return children;
}

export default AuthGuard;
