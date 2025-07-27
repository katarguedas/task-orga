import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
    route("sign-in", "routes/sign-in.tsx"),
    route("sign-up", "routes/sign-up.tsx"),
    route("sign-out", "routes/sign-out.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
  ] satisfies RouteConfig;
