import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import InventoryIcon from "@mui/icons-material/Inventory";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";

const drawerLinks = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    url: "/",
  },
  {
    title: "Users",
    icon: <PersonIcon />,
    url: "/users",
  },
  { title: "Brands", icon: <BrandingWatermarkIcon />, url: "/brands" },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/products",
  },
  {
    title: "Sales",
    icon: <PointOfSaleIcon />,
    url: "/sales",
  },
];

export default drawerLinks;
