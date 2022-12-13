import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { api } from "../../utils/config";

export const ReservationListResults = (props) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [reservations, setReservations] = useState([]);

  const SIZE = 6;
  const { search } = props;
  let result = [];
  useEffect(() => {
    axios.get(api(`reservations/page/list?value=${search}&page=${page - 1}`)).then((res) => {
      setReservations(res.data.objectList);
      setCount(Math.ceil(parseInt(res.data.count) / SIZE));
      console.log(res.data);
    });
  }, [search, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead sx={{ fontWeight: "bold" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Room Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Email Booking</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.length > 0 &&
                reservations.slice(0, SIZE).map((reservation, index) => (
                  <TableRow hover key={reservation.id}>
                    <TableCell sx={{ fontWeight: "bold" }}>{index + 1}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {reservation.roomName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {reservation.reservationStatusName === "CANCELLED" ? (
                        <span
                          style={{
                            backgroundColor: "#d75a64",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            display: "inline-block",
                            padding: "3px 6px 3px 6px",
                            borderRadius: "15px",
                          }}
                        >
                          {reservation.reservationStatusName}
                        </span>
                      ) : reservation.reservationStatusName === "APPROVED" ? (
                        <span
                          style={{
                            backgroundColor: "#039487",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            display: "inline-block",
                            padding: "3px 6px 3px 6px",
                            borderRadius: "15px",
                          }}
                        >
                          {reservation.reservationStatusName}
                        </span>
                      ) : reservation.reservationStatusName === "PENDING" ? (
                        <span
                          style={{
                            backgroundColor: "#6a5af9",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            display: "inline-block",
                            padding: "3px 6px 3px 6px",
                            borderRadius: "15px",
                          }}
                        >
                          {reservation.reservationStatusName}
                        </span>
                      ) : reservation.reservationStatusName === "PAYING" ? (
                        <span
                          style={{
                            backgroundColor: "#fece04",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            display: "inline-block",
                            padding: "3px 6px 3px 6px",
                            borderRadius: "15px",
                          }}
                        >
                          {reservation.reservationStatusName}
                        </span>
                      ) : (
                        <span>{reservation.reservationStatusName}</span>
                      )}
                    </TableCell>
                    <TableCell>{reservation.emailOwner}</TableCell>
                    <TableCell>{reservation.email}</TableCell>
                    <TableCell>{reservation.startDate}</TableCell>
                    <TableCell>{reservation.endDate}</TableCell>
                    <TableCell>{reservation.total}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <div></div>
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        className="pagination"
        count={count}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </Card>
  );
};
