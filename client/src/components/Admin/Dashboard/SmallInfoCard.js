import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const SmallInfoCard = ({ icon, title, totalNum, newNum }) => {
  // console.log(totalNum);
  return (
    <Card sx={{ borderRadius: "15px " }}>
      <CardContent>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Avatar sx={{ bgcolor: "#f7f7f7" }}>{icon}</Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">{totalNum}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {newNum} {title} added today
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SmallInfoCard;
