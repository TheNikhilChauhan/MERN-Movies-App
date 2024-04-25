import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <main className="p-3">
        <Navigation />
        <Outlet />
      </main>
    </>
  );
};

export default App;
