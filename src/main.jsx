import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AudioNotice from "./AudioNotice.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <AudioNotice />
  </React.StrictMode>
);
