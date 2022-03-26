import React from "react";

// UI
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

const TopCategoriesCard = ({ topCategories }) => {
  return (
    <Paper sx={{ p: 2 }}>
      {topCategories.length === 0 ? (
        <></>
      ) : (
        <Chart data={topCategories}>
          <PieSeries c valueField="totalUnitsSold" argumentField="_id" />
          <Legend position="bottom" />
          <Title text="Top Categories" />
        </Chart>
      )}
    </Paper>
  );
};

export default TopCategoriesCard;
