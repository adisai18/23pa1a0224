import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsPage from "./pages/NotificationsPage";
import "./App.css";

export default function App() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
        <Toolbar>
          <NotificationsIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={700}>
            Campus Notifications
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
        <NotificationsPage />
      </div>
    </>
  );
}