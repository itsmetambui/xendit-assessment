import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface UnAuthGuardType {
  children: React.ReactNode;
}

function UnAuthGuard({ children }: UnAuthGuardType) {
  const history = useHistory();
  const auth = useAuth();

  if (auth.user) {
    history.goBack();
  }

  return children;
}

export default UnAuthGuard;
