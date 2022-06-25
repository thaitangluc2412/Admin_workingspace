import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export const Budget = () => {

  const [percent, setPercent] =  useState(0);
  const [budget, setBudget] =  useState(0);
  
  useEffect(()=>{
    axios.get(`http://128.199.166.110:8080/api/reservation/budget`).then(res => {
      setPercent(res.data.data.percent);
      setBudget(res.data.data.budget)
    })
  },[percent, budget])

  return (
    <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            BUDGET
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           {budget} <span style={{fontSize:"16px"}}>$</span>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {percent < 100 ? <ArrowDownwardIcon color="error" /> : <ArrowUpwardIcon color="success" />}
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          {percent}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
};
