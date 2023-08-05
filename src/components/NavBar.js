import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function NavBar({ page, handleChange }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ borderRadius: 0, backgroundColor: "#fff", color: "black" }}
        variant="outlined"
        elevation={0}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Products
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Tabs
          value={page}
          onChange={handleChange}
          aria-label="wrapped"
        >
          <Tab value="selectProduct" label="Select Product" wrapped />
          <Tab value="productCards" label="Product cards" wrapped />
        </Tabs>
      </Box>
    </Box>
  );
}
