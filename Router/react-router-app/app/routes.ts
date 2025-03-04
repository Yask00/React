import { 
    type RouteConfig, 
    index,
    route,
    prefix,
    layout
} from "@react-router/dev/routes";

// HERE ARE ROUTES CONFIGURED

export default [
    index("routes/home.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    // NESTED
    ...prefix("concerts", [
        index("./routes/concerts.tsx"),
        // route("trending", "./routes/concerts_trading.tsx"),
        route("trending", "./components/concerts/trading.tsx"), // NO NEED FOR ADDIOTIONAL FILE, MAIN COMPONENT IS USED WITH DEFAULT EXPORT
      ]),
      layout("./components/layout/layout.tsx", [
        route("login", "./components/layout/login.tsx"), // We need <Outlet /> in layout.tsx
      ]),
] satisfies RouteConfig;
