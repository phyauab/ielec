// import { React, useState } from "react";
// import styled from "styled-components";
// import { FaBars, FaShoppingCart } from "react-icons/fa";
// import { GrUserManager } from "react-icons/gr";
// import { SearchBar } from "./UI";
// import ThemeToggler from "./ThemeToggler";
// import logoLight from "../assets/Logo-light.png";
// import logoDark from "../assets/Logo-dark.png";
// import links from "../utils/links";
// import { capitalize } from "../utils/helpers";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import { useUserContext } from "../context/UserContext";
// import Button from "./Button";

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
//   color: ${(props) => props.theme.text};
//   height: 80px;
//   width: 100%;
//   z-index: 100;
//   .nav-container {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     @media (min-width: 1440px) {
//       max-width: 90vw;
//       justify-content: space-evenly;
//     }
//     .nav-item {
//       align-items: center;
//       display: flex;
//       flex: 1 1 0px;
//       justify-content: space-between;
//       padding: 0 1rem;
//       ul {
//         align-items: center;
//         display: flex;
//         justify-content: space-between;
//         height: 100%;
//         width: 100%;
//         list-style: none;
//         a {
//           border-bottom: 1px solid ${(props) => props.theme.body};
//           color: ${(props) => props.theme.text};
//           text-decoration: none;
//           padding-bottom: 3px;
//           transition: 0.3s ease-out;
//           &:visited {
//             color: inherit;
//           }
//           &:hover {
//             border-color: ${(props) => props.theme.primary};
//           }
//         }
//       }
//     }

//     .desktop {
//       display: none;
//       @media (min-width: 1440px) {
//         display: flex;
//       }
//     }
//     .phone {
//       @media (min-width: 1440px) {
//         display: none;
//       }
//     }
//     .left {
//       justify-content: flex-start;
//       @media (min-width: 1440px) {
//         justify-content: center;
//       }
//     }
//     .right {
//       justify-content: flex-end;
//     }
//     .dashboard {
//       color: ${(props) => props.theme.text};
//       text-decoration: none;
//       transition: 0.3s ease-out;
//       &:visited {
//         color: inherit;
//       }
//       &:hover {
//         color: black;
//       }
//     }
//   }
// `;

// const Navbar = () => {
//   const { theme, isSidebarOpen, setIsSidebarOpen } = useAppContext();
//   const { user, isLoggedIn, logoutUser } = useUserContext();

//   return (
//     <Wrapper>
//       <div className="nav-container">
//         {/* Navbar-left */}
//         <div className="nav-item desktop">
//           <ul>
//             {links.map((link, index) => (
//               <Link
//                 key={index}
//                 to={{ pathname: "/products", search: `?type=${link.type}` }}
//               >
//                 <li>{capitalize(link.text)}</li>
//               </Link>
//             ))}
//           </ul>
//         </div>

//         {/* Left or Navbar-center */}
//         <div className="nav-item left">
//           <Link to="/">
//             <img src={theme === "light" ? logoLight : logoDark} alt="IELEC" />
//           </Link>
//         </div>

//         {/* Right Navbar */}
//         <div className="nav-item desktop">
//           <SearchBar />
//           <ThemeToggler />
//           {isLoggedIn ? (
//             <>
//               <p>Hi, {user.username}</p>
//               {user.isAdmin ? (
//                 <Link to="/dashboard" className="dashboard">
//                   {/* <GrUserManager /> */}
//                   Dashboard
//                 </Link>
//               ) : (
//                 <FaShoppingCart className="shopping_cart" />
//               )}

//               <Button onClick={() => logoutUser()}>Logut</Button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">
//                 <Button>Log in</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button>Sign up</Button>
//               </Link>
//             </>
//           )}
//         </div>
//         <div
//           className="nav-item phone right"
//           onClick={() => {
//             setIsSidebarOpen(!isSidebarOpen);
//           }}
//         >
//           <FaBars />
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Navbar;
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
