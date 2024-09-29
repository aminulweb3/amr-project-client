import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <div>
      {!isAuthPage && <NavBar />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Main;