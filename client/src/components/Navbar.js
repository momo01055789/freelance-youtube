import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HistoryIcon from "@mui/icons-material/History";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Sports", icon: <SportsSoccerIcon />, path: "/sports" },
    { text: "Fitness", icon: <FitnessCenterIcon />, path: "/fitness" },
    { text: "History", icon: <HistoryIcon />, path: "/history" },
    { text: "Other", icon: <CategoryIcon />, path: "/other" },
    { text: "Admin", icon: <LoginIcon />, path: "/login" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250, height: "100%", backgroundColor: "#f5f5f5" }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: "#202020",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
                borderBottom:
                  index === menuItems.length - 1 ? "none" : "1px solid #e0e0e0",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#202020" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: item.text === "Admin" ? 600 : 400,
                  color: item.text === "Admin" ? "#1976d2" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar position="static" sx={{ backgroundColor: "#202020" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            History & Sports Hub
          </Link>
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<SportsSoccerIcon />}
            component={Link}
            to="/sports"
          >
            Sports
          </Button>
          <Button
            color="inherit"
            startIcon={<FitnessCenterIcon />}
            component={Link}
            to="/fitness"
          >
            Fitness
          </Button>
          <Button
            color="inherit"
            startIcon={<HistoryIcon />}
            component={Link}
            to="/history"
          >
            History
          </Button>
          <Button
            color="inherit"
            startIcon={<CategoryIcon />}
            component={Link}
            to="/other"
          >
            Other
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LoginIcon />}
            component={Link}
            to="/login"
            sx={{ marginLeft: 2 }}
          >
            Admin
          </Button>
        </Box>

        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
