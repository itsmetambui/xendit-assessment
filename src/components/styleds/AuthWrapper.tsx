import styled from "styled-components/macro";
import { Paper } from "@material-ui/core";

const AuthWrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

export default AuthWrapper;
