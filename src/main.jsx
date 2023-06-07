import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import "./index.css";
import Home from "./routes/Home";
import SuspenseDemo from "./routes/Suspense";
import TransitionDemo from "./routes/Transition";

import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/suspense",
    element: <SuspenseDemo />,
  },
  {
    path: "/transition",
    element: <TransitionDemo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-col align-center w-full gap-5 ">
      <div className="flex flex-row justify-center gap-4 fixed top-5">
        <a href="/">Home</a>
        <a href="/suspense">Suspense</a>
        <a href="/transition">Transition</a>
      </div>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
