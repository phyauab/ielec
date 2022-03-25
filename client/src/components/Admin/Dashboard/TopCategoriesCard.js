import React from "react";

// UI
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

const data = [
  { country: "Russia", area: 12 },
  { country: "Canada", area: 7 },
  { country: "USA", area: 7 },
  { country: "China", area: 7 },
  { country: "Brazil", area: 6 },
  { country: "Australia", area: 5 },
  { country: "India", area: 2 },
  { country: "Others", area: 55 },
];

const TopCategoriesCard = ({ topCategories }) => {
  console.log(topCategories);
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
