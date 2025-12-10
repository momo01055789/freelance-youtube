import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// Import Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoGrid from "./components/VideoGrid";
import Footer from "./components/Footer";
import VideosPage from "./pages/VideosPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <VideoGrid title="Sports" category="sports" />
                    <VideoGrid title="Fitness" category="fitness" />
                    <VideoGrid title="History" category="history" />
                    <VideoGrid title="Other" category="other" />
                  </>
                }
              />
              <Route
                path="/sports"
                element={
                  <>
                    <VideoGrid
                      title="Sports Videos"
                      category="sports"
                      maxVideos={12}
                    />
                  </>
                }
              />
              <Route
                path="/fitness"
                element={
                  <>
                    <VideoGrid
                      title="Fitness Videos"
                      category="fitness"
                      maxVideos={12}
                    />
                  </>
                }
              />
              <Route
                path="/history"
                element={
                  <>
                    <VideoGrid
                      title="History Videos"
                      category="history"
                      maxVideos={12}
                    />
                  </>
                }
              />
              <Route
                path="/other"
                element={
                  <>
                    <VideoGrid
                      title="Other Videos"
                      category="other"
                      maxVideos={12}
                    />
                  </>
                }
              />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
