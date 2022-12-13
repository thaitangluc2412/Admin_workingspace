import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "src/utils/config";

export const TotalProfit = (props) => {
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    axios.get(api(`/total`)).then((res) => {
      setProfit(res.data);
    });
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {profit} <span style={{ fontSize: "16px" }}>$</span>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
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
