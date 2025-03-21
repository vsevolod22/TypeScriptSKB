import AboutUs from "@/pages/AboutUs";
import {
  LabsList,
  NewsList,
  ProjectsList,
} from "@/pages/CardListPages/CardListPages";
import Contact from "@/pages/Contact";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  NOT_FOUND = "not_found",
  NEWS = "news",
  LABS = "labs",
  PROJECTS = "projects",
  ABOUTUS = "aboutus",
  CONTACT = "contact",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.NEWS]: "/news",
  [AppRoutes.LABS]: "/labs",
  [AppRoutes.PROJECTS]: "/projects",
  [AppRoutes.ABOUTUS]: "/aboutus",
  [AppRoutes.CONTACT]: "/contact",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
  [AppRoutes.NEWS]: {
    path: RoutePath.news,
    element: <NewsList />,
  },
  [AppRoutes.LABS]: {
    path: RoutePath.labs,
    element: <LabsList />,
  },
  [AppRoutes.PROJECTS]: {
    path: RoutePath.projects,
    element: <ProjectsList />,
  },
  [AppRoutes.ABOUTUS]: {
    path: RoutePath.aboutus,
    element: <AboutUs />,
  },
  [AppRoutes.CONTACT]: {
    path: RoutePath.contact,
    element: <Contact />,
  },
};
