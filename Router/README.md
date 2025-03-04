* `react-router` (cur `v7.x`) vx is `base`, building block. Provides API for creating routing solution.
* `react-router-dom` is `wrapper` around react-router. It is supposed to be run in `browser`. Nowadays simply `re-exports` everything from react-router to smooth the upgrade path for v6 applications.
*` react-router-redux` offers so called "controlled router", bound to redux store. State changes (navigation) could be controlled by dispatching redux actions as well as by clicking on links.
* Example:
    * An application can have `multiple <Routes>`
    * `<Route>s` can be nested. The nested <Route>s `inherit` and `add` to the parent route
    ```jsx
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
        ....
    <li>
        <Link to="/contact">Contact</Link>
    </li>
    ```
* React Router is a `multi-strategy router` for React bridging the gap from React 18 to React 19. You can use it `maximally` as a React `framework` or `minimally` as a `library` with your own architecture.
* As `LIBRARY`: simple, `declarative` routing library. Its only job will be matching the URL to a set of components, providing access to URL data, and navigating around the app.
* As `FRAMEWORK` use the React Router `CLI` and `Vite` bundler plugin for a full-stack development and deployment `architecture`. This enables React Router to provide a large set of features most web projects will want, including:
    * Vite bundler and dev server integration
    * hot module replacement
    * code splitting
    * route conventions with type safety
    * Routes are configured with `routes.ts`
    * .....
* `LIBRARY`: (check vite-rpoject demo)
    * Scaffold project with vite: `create-vite vite-project --template react`
    * Install `npm i react-router`
    * Finally, render a `<BrowserRouter>` around your application:
    * Routes are configured by rendering <Routes> and <Route> that couple URL segments to UI elements.
    * Sample config
        ```jsx
        <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            <Route path="concerts">
                <Route index element={<ConcertsHome />} />
                <Route path=":city" element={<City />} />
                <Route path="trending" element={<Trending />} />
            </Route>

            <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Home />} /> 
                <Route path="settings" element={<Settings />} /> -> dashboard/settings
            </Route>
        </Routes>
        ```
    * Child routes are rendered through the `<Outlet/>` in the parent route.
        ```jsx
        import { Outlet } from "react-router";

        export default function Dashboard() {
        return (
            <div>
            <h1>Dashboard</h1>
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
            </div>
        );}
        ```
    * Routes `without` a `path` create new nesting for their children, but they don't add any `segments` to the URL.
    * `Index` routes render into their parent's `<Outlet/>` at their parent's URL (like a default child route). They are configured with the index prop
    * A `<Route path>` without an `element` prop adds a path `prefix` to its `child routes`, without introducing a parent layout.
    * If a path segment starts with `:` then it becomes a `"dynamic segment"`. When the route `matches` the URL, the dynamic segment will be parsed from the URL and provided as `params` to other router APIs like `useParams`.
        ```jsx
        <Route path="teams/:teamId" element={<Team />} />
        
        import { useParams } from "react-router";

        export default function Team() {
            let params = useParams();
            let { city } = params;
            // params.teamId
        }
        ```
    * You can make a route segment `optional` by adding a `?` to the end of the segment.
        ```jsx
        <Route path=":lang?/categories" element={<Categories />} />
        <Route path="users/:userId/edit?" element={<User />} />
        ```
    * Link to routes from your UI with `Link` and `NavLink`
        ```jsx
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "" }>
            Home
        </NavLink>

        <Link to="/concerts/salt-lake-city">Concerts</Link>
        ```
    * Users navigate your application with `<Link>`, `<NavLink>`, and `useNavigate`.
        * `useNavigate` hook allows the programmer to navigate the user to a new page without the user `interacting`.
        ```jsx
        let navigate = useNavigate();

        <MyLoginForm
            onSuccess={() => {
            navigate("/dashboard");
            }}
        />
        ```
    * `Search params` are the values after a` ?` in the URL. They are accessible from `useSearchParams`, which returns an instance of `URLSearchParams`
        ```jsx
        let [searchParams] = useSearchParams();
        return (
            <p>
                You searched for <i>{searchParams.get("q")}</i>
            </p>
        );
        ```
    * React Router creates a custom `location object` with some useful information on it accessible with `useLocation`.
        ```jsx
        function useAnalytics() {
        let location = useLocation();
            useEffect(() => {
                sendFakeAnalytics(location.pathname);
            }, [location]);
        }

        function useScrollRestoration() {
        let location = useLocation();
            useEffect(() => {
                fakeRestoreScroll(location.key);
            }, [location]);
        }
        ```
* `FRAMWORK` (check framework demo)
    * `npx create-react-router@latest my-react-router-app`
    * `Routes` are configured in `app/routes.ts`. Each route has two required parts: a `URL pattern` to match the URL, and a `file path` to the route module that defines its behavior.
    * Child routes are rendered through the `<Outlet/>` in the parent route.
    * Every route in `routes.ts` is nested inside the special `app/root.tsx` module.
    * Using `layout`, layout routes create new `nesting` for their children, but they `don't` add any `segments` to the URL. It's like the root route but they can be added at any level.
    * `Index` routes render into their `parent's Outlet` at their parent's URL (like a default child route).
    * When the component is rendered, it is provided the props defined in Route.ComponentProps that React Router will automatically generate for you. These props include:
        * `loaderData`: The data returned from the loader function in this route module
        * `actionData`: The data returned from the action function in this route module
        * `params`: An object containing the route parameters (if any).
        * `matches`: An array of all the matches in the current route tree.
    * Inside of route loaders and actions, you can return a `redirect` to another URL.
    * 
* `Custom Framework` - you can integrate React Router's framework features (like loaders, actions, fetchers, etc.) into your own bundler and server abstractions.
* 
* 
* 
* 