import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <Header />
      <main
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
