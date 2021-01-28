import React from "react";

export type RouteType = {
  id: string;
  path: string;
  name: string;
  children: null | Array<RouteChildType>;
  icon?: JSX.Element;
  component: React.ComponentClass<any> | null;
  badge?: string | number;
  containsHome?: boolean;
  open?: boolean;
  header?: string;
  guard?: React.ComponentClass<any>;
};

export type RouteChildType = {
  path: string;
  name: string;
  component: React.ComponentClass<any>;
  icon?: JSX.Element;
  badge?: string | number;
  guard?: React.ComponentClass<any>;
};
