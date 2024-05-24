import React from "react";
import ReactDOM from "react-dom/client";

// This weird hack is needed because sometime the remote is initialized before
// the shared dependency
import("./App").then(({ default: App }) => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
