import * as React from "react";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Hidden,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import LogoutButton from "./LogoutButton";
import Logo from "./Logo";
import { useUniversityQuery } from "../contexts/UniversityQueryContext";
import { navbarRoutes } from "../routes";
import { RouteType } from "../types/routes";
import DownloadButton from "./DownloadButton";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: block;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const Link = styled(NavLink)`
  color: white;
  padding-right: ${(props) => props.theme.spacing(2.5)}px;
  padding-left: ${(props) => props.theme.spacing(2.5)}px;
  text-decoration: none;

  .active {
    font-weight: bold;
  }
`;

type AppBarProps = {
  theme: {};
  onDrawerToggle: React.MouseEventHandler<HTMLElement>;
};

const AppBarComponent: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
  const { searchTerm, handleUniversitiesSearch } = useUniversityQuery();

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item>
                <Logo height={24} />
              </Grid>
              <Grid item xs />
            </Hidden>

            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input
                  placeholder="Search universities"
                  value={searchTerm}
                  onChange={(e) => handleUniversitiesSearch(e.target.value)}
                />
              </Search>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Hidden xsDown>
                {navbarRoutes.map((route: RouteType) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    activeStyle={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {route.name}
                  </Link>
                ))}
              </Hidden>

              <DownloadButton />
              <LogoutButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default withTheme(AppBarComponent);
