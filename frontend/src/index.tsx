import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, travel } from "./Components/Redux/TravelApp";
import { Provider } from "react-redux";
import { MainRouterProvider } from "./Components/Routes/MainRoute/MainRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={travel}>
    <PersistGate loading={null} persistor={persistor}>
      <MainRouterProvider />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
