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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flexGrow: 1, paddingBottom: "14px" }}>
          <Outlet />
        </main>
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
