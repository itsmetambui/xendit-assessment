import * as React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";

import { IconButton as MuiIconButton } from "@material-ui/core";
import { routes } from "../routes";
import { useAuth } from "../contexts/AuthContext";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function LogoutButton() {
  const auth = useAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    auth.logout();
    history.push(routes.SIGNIN);
  };

  return (
    <IconButton aria-haspopup="true" onClick={handleSignOut} color="inherit">
      <Power />
    </IconButton>
  );
}

export default LogoutButton;
