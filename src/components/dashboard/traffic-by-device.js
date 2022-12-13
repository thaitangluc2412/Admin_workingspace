import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import BedIcon from "@mui/icons-material/Bed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import axios from "axios";
import { api } from "src/utils/config";
import { useEffect, useState } from "react";

export const TrafficByDevice = (props) => {
  const [roomTypeCount, setRoomTypeCount] = useState([]);

  const theme = useTheme();
  useEffect(() => {
    axios.get(api(`rooms/countRoomType`)).then((res) => {
      setRoomTypeCount(res.data);
    });
  }, []);
  const bgColor = ["#575b75", "#e53935", "#6a5af9", "#FB8C00", "#F09C42", "#4EEE94", "#BF2669"];
  const data = {
    datasets: [
      {
        data: roomTypeCount.map((item) => item.value),
        backgroundColor: bgColor,
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: roomTypeCount.map((item) => item.roomTypeName),
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };
  const sumCount = roomTypeCount.reduce((accumulator, item) => {
    return accumulator + item.value;
  }, 0);

  const devices = roomTypeCount.map((item, index) => {
    const percentage = Math.round((item.value / sumCount) * 100);
    return {
      title: item.roomTypeName,
      value: percentage,
      color: bgColor[index],
    };
  });

  //   {
  //     title: "Conference",
  //     value: 29,
  //     color: "#575b75",
  //   },
  //   {
  //     title: "Co-working",
  //     value: 20,
  //     color: "#e53935",
  //   },
  //   {
  //     title: "Private",
  //     value: 11,
  //     color: "#6a5af9",
  //   },
  //   {
  //     title: "Cubicle",
  //     value: 14,
  //     color: "#FB8C00",
  //   },
  //   {
  //     title: "Huddle",
  //     value: 26,
  //     color: "#F09C42",
  //   },
  //   {
  //     title: "Event",
  //     value: 26,
  //     color: "#4EEE94",
  //   },
  //   {
  //     title: "Breakout",
  //     value: 26,
  //     color: "#BF2669",
  //   },
  // ];

  return (
    <Card {...props}>
      <CardHeader title="Percentage of rooms type" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Grid container spacing={3}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Grid key={title} item xs={6}>
              {/* <Icon color="action" /> */}
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="body1">
                {value}%
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
