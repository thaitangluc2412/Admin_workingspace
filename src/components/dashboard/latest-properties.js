import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const LatestProperties = (props) => {
  const [properties,setProperties] = useState([])
  useEffect(()=>{
    axios.get(`http://128.199.166.110:8080/api/properties/getLatest`).then(res=> {
      setProperties(res.data.data)
    })
  },[properties])
  return (
    <Card {...props}>
    <CardHeader
      subtitle={`${properties?.length} in total`}
      title="Latest Properties"
    />
    <Divider />
    <List>
      {properties?.map((product, i) => (
        <ListItem
          divider={i < properties.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.images[0].url}
              src={product.images[0].url}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.propertyName}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
    </Box>
  </Card>
  )
  
};
