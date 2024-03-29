import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "src/utils/config";

export const TotalCustomers = (props) => {
  const [totalCustomer, setTotalCustomer] = useState(0);

  useEffect(() => {
    axios.get(api(`customers/total`)).then((res) => {
      setTotalCustomer(res.data);
    });
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalCustomer}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
