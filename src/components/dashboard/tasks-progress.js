import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export const TasksProgress = (props) => {
  const [totalProperty, setTotalProperty] =  useState(0);
  
  useEffect(()=>{
    axios.get(`http://128.199.166.110:8080/api/properties/getTotal`).then(res => {
      setTotalProperty(res.data.data);
    })
  },[])

  return (
    <Card
    sx={{ height: '100%' }}
    {...props}
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
            TOTAL PROPERTIES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {totalProperty}
          </Typography>
        </Grid>
        
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
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
