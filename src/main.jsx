import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AudioNotice from "./AudioNotice.jsx";
import { installAudioUnlock } from "./utils/speech.js";
import "./styles.css";

installAudioUnlock();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <AudioNotice />
  </React.StrictMode>
);
