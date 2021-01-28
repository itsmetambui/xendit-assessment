import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { GlobalStyleProps } from "../types/styles";
import { CssBaseline, Paper as MuiPaper } from "@material-ui/core";
import { spacing } from "@material-ui/system";

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

export const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Auth: React.FC = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppContent>
        <MainContent>{children}</MainContent>
      </AppContent>
    </Root>
  );
};

export default Auth;
