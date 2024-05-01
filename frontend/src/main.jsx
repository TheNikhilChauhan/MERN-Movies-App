import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Auth

// Restricted
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoutes from "./pages/Auth/PrivateRoutes.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/User/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route index={true} path="/login" element={<Login />} />
      <Route index={true} path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
