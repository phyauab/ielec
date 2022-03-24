import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

// components
import Title from "../../components/Admin/Title";
import SmallInfoCard from "../../components/Admin/Dashboard/SmallInfoCard";
import Loading from "../../components/Loading";
import TopProductsCard from "../../components/Admin/Dashboard/TopProductsCard";
import TopCategoriesCard from "../../components/Admin/Dashboard/TopCategoriesCard";

// UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";

// Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { green, blue, purple } from "@mui/material/colors";

const DashboardPage = () => {
  const { fetchDashboard, dashboard, isLoading } = useAdminContext();
  useEffect(() => {
    fetchDashboard();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  // {
  //   console.log("-----dashboard-------");
  //   console.log(dashboard);
  // }
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Title title={"Dashboard"} />
      <Grid container rowSpacing={4}>
        {/* 1st row */}
        <Grid container item xs={12} columnSpacing={4}>
          <Grid item xs={3}>
            <SmallInfoCard
              icon={<PersonOutlineIcon sx={{ color: blue[500] }} />}
              title="Users"
              totalNum={dashboard.user.numOfUsers}
              newNum={dashboard.user.numOfNewUsers}
            />
          </Grid>
          <Grid item xs={3}>
            <SmallInfoCard
              icon={<ReceiptLongIcon sx={{ color: purple[500] }} />}
              title="Orders"
              totalNum={dashboard.order.numOfOrders}
              newNum={dashboard.order.numOfNewOrders}
            />
          </Grid>
          <Grid item xs={3}>
            <SmallInfoCard
              icon={<MonetizationOnIcon sx={{ color: green[500] }} />}
              title="Sales"
              totalNum={`$${dashboard.sales.totalSales
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              newNum={`$${dashboard.sales.todaySales
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            />
          </Grid>
        </Grid>

        {/* 2nd row */}
        <Grid container item xs={12} columnSpacing={4}>
          <Grid item xs={6}>
            <TopProductsCard />
          </Grid>
          <Grid item xs={3}>
            <TopCategoriesCard />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
