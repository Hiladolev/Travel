import { Outlet } from "react-router-dom";
import StickyFooter from "../Footer/StickyFooter";
import Header from "../Header/Header";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <StickyFooter />
      </footer>
    </div>
  );
}

export default MainLayout;
