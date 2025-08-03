import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('sign-in', 'routes/sign-in.tsx'),
  route('sign-up', 'routes/sign-up.tsx'),
  route('reset-password', 'routes/reset-password.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('demo', 'routes/demo.tsx'),
] satisfies RouteConfig;
