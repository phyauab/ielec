import React from "react";

// UI
import Paper from "@mui/material/Paper";
import { Chart, PieSeries } from "@devexpress/dx-react-chart-material-ui";

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

const TopCategoriesCard = () => {
  return (
    <Paper>
      <Chart data={data}>
        <PieSeries valueField="area" argumentField="country" />
      </Chart>
    </Paper>
  );
};

export default TopCategoriesCard;
