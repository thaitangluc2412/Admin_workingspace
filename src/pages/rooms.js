import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { RoomListToolbar } from "../components/rooms/room-list-toolbar";
import { RoomCard } from "../components/rooms/room-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utils/config";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const SIZE = 6;
  useEffect(() => {
    axios.get(api(`rooms/page/list?value=${search}&page=${page - 1}&size=6`)).then((res) => {
      setCount(Math.ceil(parseInt(res.data?.count) / SIZE));
      setRooms(res.data?.objectList);
      console.log(res.data.objectList);
    });
  }, [page, search]);
  const handlePageChange = (event, newPage) => {
    console.log("page: ", newPage);
    setPage(newPage);
  };
  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <RoomListToolbar setSearch={setSearch} search={search} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {rooms.map((room, index) => (
                <Grid item key={index} lg={4} md={6} xs={12}>
                  <RoomCard room={room} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              className="pagination"
              count={count}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Rooms.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Rooms;
