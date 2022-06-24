import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export const TotalCustomers = (props) => {
  const [totalCustomer, setTotalCustomer] =  useState(0);
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/customer/getTotal`).then(res => {
      setTotalCustomer(res.data.data);
    })
  },[])

  return (
    <Card {...props}>
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
            TOTAL CUSTOMERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {totalCustomer}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
          style={{marginRight: '10px'}}
        >
          Target:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mr: 0
          }}
        >
          30
        </Typography>
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          Each month
        </Typography>
      </Box>
    </CardContent>
    </Card>
  )
};
