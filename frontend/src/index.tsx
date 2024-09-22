import React from "react";

/** Vendors */
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

/** Entry Point */
import App from "./App";
import theme from "./dist/js/theme";

/** Custom Components */
import ErrorBoundary from "./components/shared/views/ErrorBoundary";

/** Custom CSS */
import "./dist/css/app.css";
import "./dist/css/index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = document.getElementById("root");
const target = root;

ReactDOM.createRoot(target!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </ThemeProvider>
);

// serviceWorker.unregister();
