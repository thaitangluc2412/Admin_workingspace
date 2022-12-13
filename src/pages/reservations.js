import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState } from "react";
import { ReservationListToolbar } from "src/components/reservation/reservation-list-toolbar";
import { ReservationListResults } from "src/components/reservation/reservation-list-results";

const Reservations = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <title>Reservations</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ReservationListToolbar setSearch={setSearch} search={search} />
          <Box sx={{ mt: 3 }}>
            <ReservationListResults search={search} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Reservations.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Reservations;
