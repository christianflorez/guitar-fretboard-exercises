import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "fontsource-roboto";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
