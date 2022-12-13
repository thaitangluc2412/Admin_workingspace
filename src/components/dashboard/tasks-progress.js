import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "src/utils/config";

export const TasksProgress = (props) => {
  const [totalProperty, setTotalProperty] = useState(0);

  useEffect(() => {
    axios.get(api(`rooms/total`)).then((res) => {
      setTotalProperty(res.data);
    });
  }, []);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ROOMS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalProperty}
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
