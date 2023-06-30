import MainRoute from "../../Routes/MainRoute/MainRoute";
import StickyFooter from "../Footer/StickyFooter";
import Header from "../Header/Header";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <main>
        <MainRoute />
      </main>
      <footer>
        <StickyFooter />
      </footer>
    </div>
  );
}

export default MainLayout;
