import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

import MoneyIcon from "@mui/icons-material/Money";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "src/utils/config";

export const TotalReservations = (props) => {
  const [reservations, setReservations] = useState(0);

  useEffect(() => {
    axios.get(api(`reservations/total`)).then((res) => {
      setReservations(res.data);
    });
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL RESERVATIONS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {reservations}
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
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
