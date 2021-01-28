import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { authLayoutRoutes, protectedRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import { RouteType } from "../types/routes";

const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
  routes.map(
    ({ component: Component, guard, children, path }, index: number) => {
      const Guard = guard || React.Fragment;

      return children ? (
        children.map((element, index: number) => {
          const Guard = element.guard || React.Fragment;

          return (
            <Route
              key={index}
              path={element.path}
              exact
              render={(props: RouteComponentProps) => (
                <Guard>
                  <Layout>
                    <element.component {...props} />
                  </Layout>
                </Guard>
              )}
            />
          );
        })
      ) : Component ? (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            <Guard>
              <Layout>
                <Component {...props} />
              </Layout>
            </Guard>
          )}
        />
      ) : null;
    }
  );

const Routes = () => (
  <Switch>
    {childRoutes(DashboardLayout, protectedRoutes)}
    {childRoutes(AuthLayout, authLayoutRoutes)}
    <Route
      render={() => (
        <AuthLayout>
          <Page404 />
        </AuthLayout>
      )}
    />
  </Switch>
);

export default Routes;
