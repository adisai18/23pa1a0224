import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);