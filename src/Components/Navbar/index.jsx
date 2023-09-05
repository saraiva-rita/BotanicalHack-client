// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../Context/auth.context';
// function Navbar() {
//   const { isLoggedIn, logOutUser } = useContext(AuthContext);
//   return (
//     <nav>
//       <div>
//         <Link to="/">
//           <button>Home</button>
//         </Link>
//       </div>
//       {isLoggedIn ? (
//         <div>
//           <button onClick={logOutUser}>Logout</button>
//           <Link to='/profile'>
//             <button>Profile</button>
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <Link to="/signup">
//             <button>Signup</button>
//           </Link>
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
// export default Navbar;
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#227A60' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>BOTANICAL HACK</Link>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <List>
                {isLoggedIn ? (
                  <div>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={handleMenuClose} >
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </Link>
                    <Link
                      to="/myPlants"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={handleMenuClose} >
                        <ListItemText primary="My Plants" />
                      </ListItem>
                    </Link>
                    <Link
                      to="/wishList"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={handleMenuClose} >
                        <ListItemText primary="My Wishlist" />
                      </ListItem>
                    </Link>
                    <ListItem
                      onClick={() => {
                        handleMenuClose();
                        logOutUser();
                      }}
                      
                    >
                      <ListItemText primary="Log Out" />
                    </ListItem>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={handleMenuClose} >
                        <ListItemText primary="Sign Up" />
                      </ListItem>
                    </Link>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={handleMenuClose} >
                        <ListItemText primary="Login" />
                      </ListItem>
                    </Link>
                  </div>
                )}
              </List>
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
