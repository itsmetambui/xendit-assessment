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

// Dashboard pages
const HomePage = async(() => import("../pages/dashboard/HomePage"));
const FavoritePage = async(() => import("../pages/dashboard/FavoritePage"));

export enum routes {
  HOME = "/",
  AUTH = "/auth",
  SIGNIN = "/auth/sign-in",
  SIGNUP = "/auth/sign-up",
  PAGE_ERROR_404 = "/auth/404",
  PAGE_ERROR_500 = "/auth/500",
  FAVORITE = "/favorite",
}

const authRoutes = {
  id: "Auth",
  name: "Auth",
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

const homeRoute = {
  id: "Home",
  path: routes.HOME,
  name: "Home",
  containsHome: true,
  component: HomePage,
  children: null,
  guard: AuthGuard,
};

const favoriteRoute = {
  id: "Favorite",
  path: routes.FAVORITE,
  name: "Favorite",
  component: FavoritePage,
  children: null,
  guard: AuthGuard,
};

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes that are protected
export const protectedRoutes = [homeRoute, favoriteRoute];

// Routes visible in the sidebar
export const navbarRoutes = [homeRoute, favoriteRoute];
