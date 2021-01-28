import React from "react";
import styled from "styled-components/macro";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

const Alert = styled(MuiAlert)(spacing);

function ProtectedPage() {
  return (
    <React.Fragment>
      <Alert mb={4} severity="info">
        This page is only visible by authenticated users.
      </Alert>
    </React.Fragment>
  );
}

export default ProtectedPage;
