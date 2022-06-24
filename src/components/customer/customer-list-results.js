import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Typography
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { getInitials } from '../../utils/get-initials';

export const CustomerListResults = (props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const SIZE = 7;
  const {a} = props;
  let result = [];
  useEffect(()=>{
    axios.get(`https://workingspace-api.herokuapp.com/api/customer/page?page=${page-1}&size=${SIZE}`).then(res => {
    setCount(Math.ceil(parseInt(res.data.data.count)/SIZE));
    setCustomers(res.data.data.objectList);
  })
  },[])
  useEffect(()=>{
    axios.get(`https://workingspace-api.herokuapp.com/api/customer/search?value=${a}&page=${page-1}&size=${SIZE}`).then(res => {
      setCustomers(res.data.data.objectList);
      console.log(customers);
    })
    
  },[a, page])

  useEffect(()=>{
    axios.get(`https://workingspace-api.herokuapp.com/api/customer/searchAll?value=${a}`).then(res => {
      setCount(Math.ceil(parseInt(res.data.data.count)/SIZE));
    })
  },[a])

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
console.log(a)
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  CitizendId
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Birthday
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { customers.length > 0 && customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.customerId}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg'}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.customerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.citizenId}
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.nationality}
                  </TableCell>
                  <TableCell>
                    {customer.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {customer.birthday}
                  </TableCell>
                  <TableCell>
                    {/* {format(customer.createdAt, 'dd/MM/yyyy')} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <div></div>
      <Pagination style={{display:'flex', justifyContent: "center", marginTop: '20px'}}
        className='pagination'
        count={count} 
        page={page} 
        onChange={handlePageChange} color='primary'/>
    </Card>
  );
};