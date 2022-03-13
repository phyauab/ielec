// UI
import { Icon } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";

// const getIcon = (icon) => {
//   return <Icon icon={icon} />;
// };

export const NavPanelLinks = [
  {
    title: "dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "users",
    icon: <PeopleAltIcon />,
    path: "/users",
  },
  {
    title: "products",
    icon: <LocalMallIcon />,
    path: "/products",
  },
];
