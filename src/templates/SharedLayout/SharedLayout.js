import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HeaderNav from "../../components/Header/Header";

const SharedLayout = () => {
  return (
    <>
      <HeaderNav />
      <section>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
export default SharedLayout;
