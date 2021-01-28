import React from "react";
import styled from "styled-components/macro";
import { rgba } from "polished";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { darken } from "polished";
import { RouteType } from "../types/routes";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import {
  Chip,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { navbarRoutes as routes } from "../routes/index";
import Logo from "./Logo";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)<{
  button?: boolean;
  component?: React.ReactNode;
  to?: string;
}>`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const Link = styled(ListItem)<{
  activeClassName: string;
  component: typeof NavLink;
  exact: boolean;
  to: string;
}>`
  padding-left: ${(props) => props.theme.spacing(17.5)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &:hover {
    background-color: ${(props) =>
      darken(0.015, props.theme.sidebar.background)};
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

type SidebarLinkPropsType = {
  name: string;
  to: string;
  badge?: string | number;
  icon?: JSX.Element;
};

const SidebarLink: React.FC<SidebarLinkPropsType> = ({
  name,
  to,
  badge,
  icon,
}) => {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
};

type SidebarPropsType = {
  classes?: string;
  staticContext: string;
  location: {
    pathname: string;
  };
  routes: Array<RouteType>;
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: "permanent" | "persistent" | "temporary";
  open?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<RouteComponentProps & SidebarPropsType> = ({
  classes,
  staticContext,
  location,
  ...rest
}) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/" button>
        <Logo height={24} />
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((route: RouteType, index) => (
              <SidebarLink
                key={index}
                name={route.name}
                to={route.path}
                icon={route.icon}
                badge={route.badge}
              />
            ))}
          </Items>
        </List>
      </Scrollbar>
    </Drawer>
  );
};

export default withRouter(Sidebar);
