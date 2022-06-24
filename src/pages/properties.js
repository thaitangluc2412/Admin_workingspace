import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { PropertyListToolbar } from '../components/property/property-list-toolbar';
import { PropertyCard } from '../components/property/property-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Properties = () => {
  const [properties,setProperties] = useState([])
  const [count,setCount] = useState(0);
  const [page, setPage] = useState(1);
  const SIZE = 6;
  useEffect(()=>{
    axios.get(`http://128.199.166.110:8080/api/properties/page?page=${page-1}&size=${SIZE}`).then(res=> {
      setCount(Math.ceil(parseInt(res.data.data.count)/SIZE));
      setProperties(res.data.data.objectList)
      console.log(res.data.data.objectList);
    })
  },[page])
  const handlePageChange = (event, newPage) => {
    console.log('page: ', newPage);
    setPage(newPage);
  };
  return (
    <>
      <Head>
        <title>
          Properties
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
          <PropertyListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {properties.map((property,index) => (
                <Grid
                  item
                  key={index}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <PropertyCard property={property}/>
                </Grid>
              ))}
              
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination style={{display:'flex', justifyContent: "center"}}
              className='pagination'
              count={count} 
              page={page} 
              onChange={handlePageChange} color='primary'/>
          </Box>
        </Container>
      </Box>
    </>
  );
}


Properties.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Properties;
