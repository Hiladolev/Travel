import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <footer> */}
      <Footer />
      {/* </footer> */}
    </div>
  );
}

export default MainLayout;
