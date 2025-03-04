import type { Route } from "./+types/route-name";

// NOT WORKING
// https://github.com/remix-run/react-router/issues/12364
export function Welcome({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      welcome
      <div>
        <h1>Welcome to My Route with Props!</h1>
        <p>Loader Data: {JSON.stringify(loaderData)}</p>
        <p>Action Data: {JSON.stringify(actionData)}</p>
        <p>Route Parameters: {JSON.stringify(params)}</p>
        <p>Matched Routes: {JSON.stringify(matches)}</p>
      </div>
    </main>
  );
}

