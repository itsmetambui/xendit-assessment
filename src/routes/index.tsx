import React from "react";

import async from "../components/Async";

import { Users } from "react-feather";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));
const UnAuthGuard = async(() => import("../components/UnAuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Home page
const HomePage = async(() => import("../pages/dashboard"));

export enum routes {
  HOME = "/",
  AUTH = "/auth",
  SIGNIN = "/auth/sign-in",
  SIGNUP = "/auth/sign-up",
  PAGE_ERROR_404 = "/auth/404",
  PAGE_ERROR_500 = "/auth/500",
}

const authRoutes = {
  id: "Auth",
  path: routes.AUTH,
  icon: <Users />,
  children: [
    {
      path: routes.SIGNIN,
      name: "Sign In",
      component: SignIn,
      guard: UnAuthGuard,
    },
    {
      path: routes.SIGNUP,
      name: "Sign Up",
      component: SignUp,
      guard: UnAuthGuard,
    },
    {
      path: routes.PAGE_ERROR_404,
      name: "404 Page",
      component: Page404,
    },
    {
      path: routes.PAGE_ERROR_500,
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "home",
  path: routes.HOME,
  component: HomePage,
  children: null,
  guard: AuthGuard,
};

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [];
