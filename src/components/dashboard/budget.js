import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "src/utils/config";

export const Budget = () => {
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    axios.get(api(`reservations/profit`)).then((res) => {
      setProfit(res.data);
    });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              REVENUE
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {profit} <span style={{ fontSize: "16px" }}>$</span>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
