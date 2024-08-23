import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export async function loader() {
  throw new Response("Oh no! Something went wrong!", {
    status: 500,
    statusText: "sda",
  });
}

export default function sarasa() {
  return <div>sarasa</div>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}