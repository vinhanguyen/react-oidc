import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Callback, { loader as callbackLoader } from "./auth/Callback";
import Claims from "./Claims";
import Fetch from "./Fetch";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'token/claims',
        element: <Claims />
      },
      {
        path: 'fetch',
        element: <Fetch />
      }
    ]
  },
  {
    path: '/callback',
    element: <Callback />,
    loader: callbackLoader
  }
]);