import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useState} from 'react'

const Customers = () => {
  const [a,setA] = useState("")
  return (
    <>
      <Head>
        <title>
          Customers
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar setA={setA} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults a={a}/>
          </Box>
        </Container>
      </Box>
    </>
  )
};
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
